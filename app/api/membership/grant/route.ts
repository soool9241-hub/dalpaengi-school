import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { membershipGrantSchema } from "@/lib/validations";
import { sendSms } from "@/lib/solapi";

// POST /api/membership/grant - 결제 완료 웹훅에서 호출
// standard 결제 → yearly_1year 자격 · premium 결제 → lifetime 자격
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = membershipGrantSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "입력값을 확인해주세요", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      applicant_id,
      course_type,
      name,
      phone,
      email,
      payment_id,
    } = parsed.data;

    const membershipType =
      course_type === "premium" ? "lifetime" : "yearly_1year";
    const smsTemplate =
      course_type === "premium"
        ? "membership_granted_lifetime"
        : "membership_granted_yearly";

    // 1년 멤버십만 만료일 · 평생은 NULL
    const expiresAt =
      membershipType === "yearly_1year"
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        : null;

    const supabase = createServerClient();

    // UNIQUE(phone, membership_type)으로 중복 방지
    const { data, error } = await supabase
      .from("memberships")
      .insert({
        applicant_id: applicant_id || null,
        name,
        phone,
        email: email || null,
        membership_type: membershipType,
        granted_from: `course_${course_type}`,
        source_payment_id: payment_id || null,
        expires_at: expiresAt,
        status: "active",
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        // 이미 자격 있음 - 성공 응답
        return NextResponse.json({
          success: true,
          already_granted: true,
          type: membershipType,
        });
      }
      console.error("[membership/grant] insert:", error);
      return NextResponse.json(
        { error: "자격 부여 실패: " + error.message },
        { status: 500 }
      );
    }

    // 자격 부여 SMS (실패해도 부여는 성공)
    try {
      await sendSms(phone, smsTemplate, { name });
    } catch (smsErr) {
      console.error("[membership/grant] sms:", smsErr);
    }

    return NextResponse.json({
      success: true,
      membership_id: data.id,
      type: membershipType,
      expires_at: expiresAt,
    });
  } catch (err) {
    console.error("[membership/grant] error:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
