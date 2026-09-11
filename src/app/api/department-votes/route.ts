import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { departmentVoteSchema } from "@/lib/department-votes";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json(
      { error: "invalid_content_type" },
      { status: 415 },
    );
  }
  if (Number(request.headers.get("content-length") ?? 0) > 4096) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }
  let payload: unknown;
  try {
    const text = await request.text();
    if (text.length > 4096)
      return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
    payload = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const parsed = departmentVoteSchema.safeParse(payload);
  if (!parsed.success)
    return NextResponse.json({ error: "invalid_vote" }, { status: 400 });
  if (request.cookies.has("departify-voted")) {
    return NextResponse.json({ error: "already_voted" }, { status: 409 });
  }
  // No fallback to simulated success: a vote is accepted only after persistence.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return NextResponse.json(
      { error: "temporarily_unavailable" },
      { status: 503 },
    );
  }
  const vote = parsed.data;
  try {
    const client = getSupabaseAdminClient();
    const { error, data } = await client
      .from("department_interest_votes")
      .upsert(
        {
          id: vote.id,
          departments: vote.departments,
          locale: vote.locale,
          name: vote.notify ? vote.name || null : null,
          email: vote.notify ? vote.email.toLowerCase() : null,
          notify: vote.notify,
          consent_version: vote.notify ? "department-launch-v1" : null,
          offer: vote.notify ? "launch-one-month-free" : null,
        },
        { onConflict: "id", ignoreDuplicates: true },
      )
      .select("notify")
      .abortSignal(AbortSignal.timeout(8000));
    if (error)
      return NextResponse.json(
        { error: "temporarily_unavailable" },
        { status: 503 },
      );
    let notify = data?.[0]?.notify;
    if (notify === undefined) {
      const existing = await client
        .from("department_interest_votes")
        .select("notify")
        .eq("id", vote.id)
        .abortSignal(AbortSignal.timeout(8000))
        .single();
      if (existing.error || !existing.data)
        return NextResponse.json(
          { error: "temporarily_unavailable" },
          { status: 503 },
        );
      notify = existing.data.notify;
    }
    const response = NextResponse.json({ ok: true, notify }, { status: 201 });
    response.cookies.set("departify-voted", "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  } catch {
    return NextResponse.json(
      { error: "temporarily_unavailable" },
      { status: 503 },
    );
  }
}
