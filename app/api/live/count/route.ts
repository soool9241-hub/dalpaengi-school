import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

// GET /api/live/count?live_date=YYYY-MM-DD - 특정 회차 선착순 카운터
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const liveDate = searchParams.get("live_date");

  if (!liveDate || !/^\d{4}-\d{2}-\d{2}$/.test(liveDate)) {
    return NextResponse.json(
      { error: "invalid live_date" },
      { status: 400 }
    );
  }

  try {
    const supabase = createServerClient();
    const { count } = await supabase
      .from("live_registrations")
      .select("*", { count: "exact", head: true })
      .eq("live_date", liveDate);

    return NextResponse.json(
      { count: count ?? 0, live_date: liveDate },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[live/count] error:", err);
    return NextResponse.json({ count: 0 });
  }
}
