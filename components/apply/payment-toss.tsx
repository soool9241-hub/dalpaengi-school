"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Props = {
  applicantId: string;
};

// 토스페이먼츠 결제 위젯 트리거
// 실제 SDK 호출은 SSR 이슈로 클라이언트에서 dynamic import
export function PaymentToss({ applicantId }: Props) {
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicant_id: applicantId }),
      });
      const session = await res.json();
      if (!res.ok) {
        toast.error(session.error || "결제 세션 생성 실패");
        return;
      }

      // SDK dynamic import (client only)
      const { loadTossPayments } = await import("@tosspayments/payment-sdk");
      const toss = await loadTossPayments(session.clientKey);

      await toss.requestPayment("카드", {
        amount: session.amount,
        orderId: session.orderId,
        orderName: session.orderName,
        customerName: session.customerName,
        customerEmail: session.customerEmail,
        successUrl: `${window.location.origin}/success?paid=1`,
        failUrl: `${window.location.origin}/apply?error=payment`,
      });
    } catch (err) {
      console.error(err);
      toast.error("결제창 호출 실패");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handlePay}
      size="lg"
      className="w-full rounded-full h-14 text-base font-semibold"
      disabled={loading}
    >
      {loading ? "결제창 여는 중..." : "💳 토스로 결제하기"}
    </Button>
  );
}
