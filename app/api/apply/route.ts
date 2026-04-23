import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { applySchema } from "@/lib/validations";
import { sendSms } from "@/lib/solapi";

// POST /api/apply - v6 빌더 기초 신청 (상시)
// 기본/프리미엄은 /api/waitlist로 라우팅 (P2)
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = applySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "입력값을 확인해주세요", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // v6: 기초만 API로 처리 · 기본/프리미엄은 대기자 경로
    if (parsed.data.course_type !== "basic") {
      return NextResponse.json(
        {
          error: "해당 코스는 SOLD OUT 상태예요. 대기자 등록으로 이동해주세요.",
          redirect: `/courses/${parsed.data.course_type}`,
        },
        { status: 409 }
      );
    }

    const supabase = createServerClient();

    // 1. 좌석 설정 조회 (기초)
    const { data: config, error: cfgErr } = await supabase
      .from("seat_config")
      .select("*")
      .eq("course_type", "basic")
      .eq("cohort", Number(process.env.NEXT_PUBLIC_COHORT || 1))
      .eq("is_active", true)
      .maybeSingle();

    if (cfgErr || !config) {
      return NextResponse.json(
        { error: "현재 모집 중인 기수가 없어요" },
        { status: 400 }
      );
    }

    // 2. 얼리버드 여부 → 가격 결정
    const isEarlybird =
      !!config.earlybird_deadline &&
      new Date() < new Date(config.earlybird_deadline);
    const price = isEarlybird
      ? config.earlybird_price ?? config.regular_price
      : config.regular_price;

    // 3. 신청 저장
    const { data, error } = await supabase
      .from("applicants")
      .insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        course_type: "basic",
        course_price: price,
        cohort: config.cohort,
        scheduled_date: config.scheduled_date,
        current_work: parsed.data.current_work || null,
        expectation: parsed.data.expectation || null,
        utm_source: parsed.data.utm_source || null,
        utm_medium: parsed.data.utm_medium || null,
        utm_campaign: parsed.data.utm_campaign || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[apply] insert error:", error);
      return NextResponse.json(
        { error: "신청 저장 실패: " + error.message },
        { status: 500 }
      );
    }

    // 4. 환영 SMS (실패해도 신청 성공 처리)
    try {
      await sendSms(parsed.data.phone, "apply_welcome", {
        name: parsed.data.name,
        course: "기초",
        price: price.toLocaleString(),
      });
      await supabase
        .from("applicants")
        .update({ sms_welcome_sent: true })
        .eq("id", data.id);
    } catch (smsErr) {
      console.error("[apply] sms error:", smsErr);
    }

    return NextResponse.json({
      success: true,
      applicant_id: data.id,
      price,
      is_earlybird: isEarlybird,
    });
  } catch (err) {
    console.error("[apply] error:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
