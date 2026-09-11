const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const { NextRequest } = require("next/server");

function load(file, imports = {}, env = {}) {
  const source = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const context = vm.createContext({
    exports: {}, AbortSignal, process: { env },
    require: name => imports[name] ?? require(name),
  });
  vm.runInContext(source, context);
  return context.exports;
}
const schema = load("src/lib/department-votes.ts", {
  "@/data/department-roadmap": load("src/data/department-roadmap.ts"),
});
const sample = { id: "071c3c5a-70d9-4bf9-a575-abd81f9e013f", departments: ["rrhh", "logistica"], locale: "es", notify: false };
function fixture({ configured = true, error = null, duplicate = false, previousNotify = false } = {}) {
  const writes = [];
  const client = { from: () => ({
    upsert: value => {
      writes.push(value);
      return { select: () => ({ abortSignal: async () => ({
        error, data: duplicate ? [] : [{ notify: value.notify }],
      }) }) };
    },
    select: () => ({ eq: () => ({ abortSignal: () => ({
      single: async () => ({ error: null, data: { notify: previousNotify } }),
    }) }) }),
  }) };
  const route = load("src/app/api/department-votes/route.ts", {
    "@/lib/department-votes": schema,
    "@/lib/supabase/admin": { getSupabaseAdminClient: () => client },
  }, configured ? { NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "test-only", NODE_ENV: "test" } : {});
  return { writes, post: (body = sample, headers = {}) => route.POST(new NextRequest("http://localhost:3000/api/department-votes", {
    method: "POST", headers: { "content-type": "application/json", origin: "http://localhost:3000", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body),
  })) };
}

test("anonymous vote stores priorities without contact data", async () => {
  const f = fixture();
  const response = await f.post({ ...sample, name: "Optional name" });
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true, notify: false });
  assert.equal(f.writes[0].name, null);
  assert.equal(f.writes[0].email, null);
  assert.equal(f.writes[0].offer, null);
  assert.match(response.headers.get("set-cookie"), /HttpOnly/i);
});
test("opt-in records notification consent and the promised launch offer", async () => {
  const f = fixture();
  assert.equal((await f.post({ ...sample, notify: true, name: "Alex", email: "Alex@Example.test" })).status, 201);
  assert.equal(f.writes[0].email, "alex@example.test");
  assert.equal(f.writes[0].consent_version, "department-launch-v1");
  assert.equal(f.writes[0].offer, "launch-one-month-free");
});
test("empty selections, unknown departments and unconsented contact data are rejected", async () => {
  for (const invalid of [
    { ...sample, departments: [] },
    { ...sample, departments: ["unknown"] },
    { ...sample, email: "alex@example.test", notify: false },
    { ...sample, notify: true, email: "" },
    { ...sample, email: "not-an-email", notify: true },
    { ...sample, website: "spam" },
  ]) {
    const f = fixture();
    assert.equal((await f.post(invalid)).status, 400);
    assert.equal(f.writes.length, 0);
  }
});
test("cross-origin, wrong content type and oversized requests never reach persistence", async () => {
  for (const [body, headers, status] of [
    [sample, { origin: "https://another.example" }, 403],
    [sample, { "content-type": "text/plain" }, 415],
    [" ".repeat(4100), {}, 413],
    ["not-json", {}, 400],
  ]) {
    const f = fixture();
    assert.equal((await f.post(body, headers)).status, status);
    assert.equal(f.writes.length, 0);
  }
});
test("missing configuration and database failures never report success or set a cookie", async () => {
  for (const options of [{ configured: false }, { error: { message: "database unavailable" } }]) {
    const f = fixture(options);
    const response = await f.post();
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("set-cookie"), null);
  }
});
test("a retried request acknowledges the original consent without overwriting it", async () => {
  const f = fixture({ duplicate: true, previousNotify: false });
  const response = await f.post({ ...sample, notify: true, email: "alex@example.test" });
  assert.equal(response.status, 201);
  assert.equal((await response.json()).notify, false);
});
test("a browser that already voted cannot add another vote", async () => {
  const f = fixture();
  assert.equal((await f.post(sample, { cookie: "departify-voted=1" })).status, 409);
  assert.equal(f.writes.length, 0);
});
test("repeated department choices count once", async () => {
  const f = fixture();
  await f.post({ ...sample, departments: ["rrhh", "rrhh"] });
  assert.deepEqual(Array.from(f.writes[0].departments), ["rrhh"]);
});
