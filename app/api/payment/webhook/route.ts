import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { confirmPayment } from "@/lib/toss";
import { sendSms } from "@/lib/solapi";

// POST /api/payment/webhook - 토스 결제 확정 콜백
// 1. confirmPayment로 승인 확정
// 2. applicants.payment_status = paid
// 3. course_type이 standard/premium이면 /api/membership/grant 자동 호출
// 4. 결제 완료 SMS 발송
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { paymentKey, orderId, amount } = await req.json();
    if (!paymentKey || !orderId || typeof amount !== "number") {
      return NextResponse.json(
        { error: "paymentKey, orderId, amount 필수" },
        { status: 400 }
      );
    }

    // 1. 토스에 결제 확정 요청
    const { ok, data } = await confirmPayment(paymentKey, orderId, amount);
    if (!ok) {
      console.error("[payment/webhook] confirm failed:", data);
      return NextResponse.json(
        { error: "결제 확정 실패", detail: data },
        { status: 400 }
      );
    }

    // 2. applicant 조회 (orderId = payment_id)
    const supabase = createServerClient();
    const { data: applicant, error: appErr } = await supabase
      .from("applicants")
      .select("id, name, phone, email, course_type, course_price")
      .eq("payment_id", orderId)
      .single();

    if (appErr || !applicant) {
      console.error("[payment/webhook] applicant not found:", orderId);
      return NextResponse.json({ error: "신청 내역 없음" }, { status: 404 });
    }

    if (applicant.course_price !== amount) {
      console.warn("[payment/webhook] amount mismatch:", {
        expected: applicant.course_price,
        received: amount,
      });
    }

    // 3. payment_status 업데이트
    await supabase
      .from("applicants")
      .update({
        payment_status: "paid",
        paid_at: new Date().toISOString(),
        status: "paid",
        payment_method: data.method || null,
      })
      .eq("id", applicant.id);

    // 4. 결제 완료 SMS (실패해도 후속 진행)
    try {
      await sendSms(applicant.phone, "payment_confirm", {
        name: applicant.name,
        course:
          applicant.course_type === "premium"
            ? "프리미엄"
            : applicant.course_type === "standard"
            ? "기본"
            : "기초",
        date: "TBD", // seat_config 조회해서 주입 가능
        time: "TBD",
      });
    } catch (e) {
      console.error("[payment/webhook] confirm sms:", e);
    }

    // 5. ⭐ v6 핵심: standard/premium이면 멤버십 자격 자동 부여
    if (
      applicant.course_type === "standard" ||
      applicant.course_type === "premium"
    ) {
      try {
        const grantRes = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/membership/grant`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              applicant_id: applicant.id,
              course_type: applicant.course_type,
              name: applicant.name,
              phone: applicant.phone,
              email: applicant.email || undefined,
              payment_id: orderId,
            }),
          }
        );
        if (!grantRes.ok) {
          console.error(
            "[payment/webhook] membership grant failed:",
            await grantRes.text()
          );
        }
      } catch (e) {
        console.error("[payment/webhook] membership grant:", e);
      }
    }

    return NextResponse.json({ success: true, applicant_id: applicant.id });
  } catch (err) {
    console.error("[payment/webhook] error:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
