import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { waitlistSchema } from "@/lib/validations";
import { sendSms } from "@/lib/solapi";
import { WAITLIST_TARGET_LABEL } from "@/lib/constants";

export const dynamic = "force-dynamic";

// GET /api/waitlist?target_type=course_standard - 현재 대기자 수 반환
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const targetType = searchParams.get("target_type");

  if (!targetType || !(targetType in WAITLIST_TARGET_LABEL)) {
    return NextResponse.json({ error: "invalid target_type" }, { status: 400 });
  }

  const supabase = createServerClient();
  const { count, error } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true })
    .eq("target_type", targetType)
    .neq("status", "declined");

  if (error) {
    console.error("[waitlist GET]", error);
    return NextResponse.json({ count: 0 });
  }

  return NextResponse.json(
    { count: count ?? 0, target_type: targetType },
    { headers: { "Cache-Control": "no-store" } }
  );
}

// POST /api/waitlist - v6 통합 대기자 등록 (기본/프리미엄/스쿨)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = waitlistSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "입력값을 확인해주세요", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // 1. 대기자 저장 - UNIQUE(phone, target_type)
    const { data, error } = await supabase
      .from("waitlist")
      .insert(parsed.data)
      .select("id, created_at")
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "이미 대기자로 등록되어 있어요" },
          { status: 409 }
        );
      }
      console.error("[waitlist POST] insert error:", error);
      return NextResponse.json(
        { error: "등록 실패: " + error.message },
        { status: 500 }
      );
    }

    // 2. 순번 계산
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .eq("target_type", parsed.data.target_type)
      .lte("created_at", data.created_at);

    const position = count || 1;

    // 3. 대기자 접수 SMS (실패해도 등록 성공 처리)
    try {
      await sendSms(parsed.data.phone, "waitlist_received", {
        name: parsed.data.name,
        target: WAITLIST_TARGET_LABEL[parsed.data.target_type],
        position,
      });
    } catch (smsErr) {
      console.error("[waitlist POST] sms error:", smsErr);
    }

    return NextResponse.json({
      success: true,
      waitlist_id: data.id,
      position,
    });
  } catch (err) {
    console.error("[waitlist POST] error:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
