// scripts/check-i18n-parity.cjs
// Compara recursivamente es.json vs en.json.
// Reglas (NO compara valores — la traducción legítima los hace distintos):
//   - mismas keys (recursivo)
//   - misma estructura (objetos/objetos, arrays/arrays con mismo length)
//   - ningún valor vacío en ES o EN (string.trim() === "")
//   - ningún mismatch de tipo entre ES y EN
// Sale con código 1 si hay drift.
const fs = require("node:fs");
const path = require("node:path");

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

function isObject(v) {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function compare(es, en, p = "") {
  const issues = [];
  if (isObject(es) && isObject(en)) {
    const esKeys = new Set(Object.keys(es));
    const enKeys = new Set(Object.keys(en));
    for (const k of esKeys) if (!enKeys.has(k))
      issues.push({ key: p ? `${p}.${k}` : k, reason: "missing_in_en" });
    for (const k of enKeys) if (!esKeys.has(k))
      issues.push({ key: p ? `${p}.${k}` : k, reason: "extra_in_en" });
    for (const k of esKeys) {
      if (enKeys.has(k)) issues.push(...compare(es[k], en[k], p ? `${p}.${k}` : k));
    }
  } else if (Array.isArray(es) && Array.isArray(en)) {
    if (es.length !== en.length) {
      issues.push({ key: p, es: es.length, en: en.length, reason: "array_length_mismatch" });
    }
    for (let i = 0; i < Math.min(es.length, en.length); i++) {
      issues.push(...compare(es[i], en[i], `${p}[${i}]`));
    }
  } else if (typeof es !== typeof en) {
    issues.push({ key: p, es, en, reason: "type_mismatch" });
  } else {
    if (typeof es === "string") {
      if (es.trim() === "" && String(en).trim() !== "") {
        issues.push({ key: p, es, en, reason: "empty_in_es" });
      } else if (String(en).trim() === "" && es.trim() !== "") {
        issues.push({ key: p, es, en, reason: "empty_in_en" });
      }
    }
  }
  return issues;
}

const dir = path.resolve(__dirname, "../src/i18n/messages");
const es = readJson(path.join(dir, "es.json"));
const en = readJson(path.join(dir, "en.json"));

const issues = compare(es, en);
if (issues.length) {
  console.error(`\n❌ i18n parity: ${issues.length} issue(s)\n`);
  for (const i of issues.slice(0, 50)) {
    console.error(`  [${i.reason}] ${i.key}${i.es !== undefined ? `  es=${JSON.stringify(i.es)}` : ""}${i.en !== undefined ? `  en=${JSON.stringify(i.en)}` : ""}`);
  }
  if (issues.length > 50) console.error(`  ... and ${issues.length - 50} more`);
  process.exit(1);
}
console.log("✅ i18n parity: keys OK, no empty values");