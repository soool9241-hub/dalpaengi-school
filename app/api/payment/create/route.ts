import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { makeOrderId, orderName } from "@/lib/toss";

// POST /api/payment/create - 결제 세션 생성 (orderId 발급)
// 클라이언트는 응답받은 orderId로 토스 위젯 호출
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { applicant_id } = await req.json();

    if (!applicant_id) {
      return NextResponse.json(
        { error: "applicant_id 필수" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { data: applicant, error } = await supabase
      .from("applicants")
      .select("id, name, phone, email, course_type, course_price, payment_status")
      .eq("id", applicant_id)
      .single();

    if (error || !applicant) {
      return NextResponse.json({ error: "신청 내역 없음" }, { status: 404 });
    }

    if (applicant.payment_status === "paid") {
      return NextResponse.json({ error: "이미 결제 완료됨" }, { status: 409 });
    }

    const orderId = makeOrderId(applicant.course_type, applicant.id);

    // orderId를 applicants에 기록 (멱등성 보장)
    await supabase
      .from("applicants")
      .update({ payment_id: orderId })
      .eq("id", applicant_id);

    return NextResponse.json({
      success: true,
      orderId,
      orderName: orderName(applicant.course_type),
      amount: applicant.course_price,
      customerName: applicant.name,
      customerEmail: applicant.email || undefined,
      clientKey: process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY,
    });
  } catch (err) {
    console.error("[payment/create] error:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
