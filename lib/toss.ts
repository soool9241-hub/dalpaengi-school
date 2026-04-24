// 토스페이먼츠 유틸 - 결제 승인 + 서명 검증
const TOSS_SECRET = process.env.TOSS_SECRET_KEY || "";
const TOSS_API = "https://api.tosspayments.com/v1";

// Basic Auth 헤더 (secret key + ":" base64)
function authHeader() {
  const basic = Buffer.from(`${TOSS_SECRET}:`).toString("base64");
  return { Authorization: `Basic ${basic}` };
}

// 결제 승인 - paymentKey + orderId + amount로 최종 확정
export async function confirmPayment(
  paymentKey: string,
  orderId: string,
  amount: number
) {
  const res = await fetch(`${TOSS_API}/payments/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

// orderId 생성 - {courseType}_{applicantId}_{timestamp}
export function makeOrderId(courseType: string, applicantId: string) {
  const ts = Date.now();
  return `${courseType}_${applicantId.slice(0, 8)}_${ts}`;
}

// 결제 금액 + 주문명 조합
export function orderName(courseType: string) {
  const label =
    courseType === "premium"
      ? "빌더 프리미엄 1박2일"
      : courseType === "standard"
      ? "빌더 기본 6시간"
      : "빌더 기초 3시간";
  return `달팽이멤버십 · ${label}`;
}
