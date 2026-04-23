import { NextResponse } from "next/server";
import { sendSms, smsTemplates, type TemplateKey } from "@/lib/solapi";

// POST /api/send-sms - 내부 API (폼별 API에서 재사용 · 관리자 발송 패널 공통)
// v6 템플릿 10종: apply_welcome, payment_confirm, school_waitlist_welcome,
//   live_welcome, live_reminder, course_reminder_d1,
//   waitlist_received, waitlist_open_invite,
//   membership_granted_yearly, membership_granted_lifetime
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { phone, template, vars } = await req.json();

    if (!phone || typeof phone !== "string") {
      return NextResponse.json({ error: "phone 필수" }, { status: 400 });
    }
    if (!template || !(template in smsTemplates)) {
      return NextResponse.json({ error: "알 수 없는 템플릿" }, { status: 400 });
    }

    const { success, result } = await sendSms(
      phone,
      template as TemplateKey,
      vars || {}
    );

    if (!success) {
      return NextResponse.json({ success: false, result }, { status: 502 });
    }
    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error("[send-sms] error:", err);
    return NextResponse.json({ error: "발송 실패" }, { status: 500 });
  }
}
