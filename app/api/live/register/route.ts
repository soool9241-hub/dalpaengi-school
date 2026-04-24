import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { liveRegisterSchema } from "@/lib/validations";
import { sendSms } from "@/lib/solapi";

// POST /api/live/register - 매주 토 무료 라이브 신청
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = liveRegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "입력값을 확인해주세요", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("live_registrations")
      .insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        live_date: parsed.data.live_date,
        live_topic: parsed.data.live_topic || null,
        utm_source: parsed.data.utm_source || null,
        utm_campaign: parsed.data.utm_campaign || null,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "이미 이번 회차에 신청하셨어요" },
          { status: 409 }
        );
      }
      console.error("[live/register] insert:", error);
      return NextResponse.json(
        { error: "신청 저장 실패: " + error.message },
        { status: 500 }
      );
    }

    // 환영 SMS
    try {
      await sendSms(parsed.data.phone, "live_welcome", {
        name: parsed.data.name,
        date: parsed.data.live_date,
        link: "당일 카톡 발송", // 줌 링크는 당일 오후 카톡으로 안내
      });
    } catch (smsErr) {
      console.error("[live/register] sms:", smsErr);
    }

    return NextResponse.json({
      success: true,
      registration_id: data.id,
    });
  } catch (err) {
    console.error("[live/register] error:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
