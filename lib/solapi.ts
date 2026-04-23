import crypto from "crypto";

// Solapi SMS v6 - HMAC-SHA256 서명 + 10종 템플릿 (대기자/멤버십 자격 포함)
const SOLAPI_API_KEY = process.env.SOLAPI_API_KEY!;
const SOLAPI_API_SECRET = process.env.SOLAPI_API_SECRET!;
const SENDER = process.env.SOLAPI_SENDER_NUMBER!;

type SmsVars = Record<string, string | number>;

export const smsTemplates = {
  // === 기초 코스 신청 ===
  apply_welcome: (v: SmsVars) =>
    `[달팽이스쿨] ${v.name}님 빌더코스 ${v.course} 신청 감사해요 🐌\n\n` +
    `수강료 ${v.price}원 결제 후 최종 확정돼요.\n` +
    `결제 링크는 카톡으로 보내드릴게요.\n\n` +
    `카톡: sool9241`,

  payment_confirm: (v: SmsVars) =>
    `[달팽이스쿨] ${v.name}님 결제 완료! 🎉\n\n` +
    `빌더코스 ${v.course} 확정됐어요.\n` +
    `📅 ${v.date} ${v.time}\n` +
    `🔗 줌 링크는 D-1에 발송\n\n` +
    `준비물: 노트북 + 사업 아이디어`,

  school_waitlist_welcome: (v: SmsVars) =>
    `[달팽이스쿨] ${v.name}님, 대기자 등록 감사해요 🐌\n\n` +
    `1기 오픈할 때 가장 먼저 안내드릴게요.\n` +
    `그 전에 빌더코스에서 먼저 만나봐요!\n\n` +
    `카톡: sool9241`,

  live_welcome: (v: SmsVars) =>
    `[달팽이스쿨 라이브] ${v.name}님 신청 완료 🐌\n\n` +
    `📅 ${v.date} 20:00\n` +
    `🔗 ${v.link}\n\n` +
    `당일 오후에 한 번 더 알림 드릴게요.`,

  live_reminder: (v: SmsVars) =>
    `[달팽이스쿨 라이브] 오늘 저녁 8시예요 🐌\n\n` +
    `📺 ${v.link}\n\n` +
    `편하게 보시고 질문 남겨주세요!`,

  course_reminder_d1: (v: SmsVars) =>
    `[달팽이스쿨] ${v.name}님, 내일 빌더코스 ${v.course}예요 🐌\n\n` +
    `📅 ${v.date} ${v.time}\n` +
    `🔗 줌: ${v.zoom}\n` +
    `📝 준비물: 노트북 + 사업 아이디어\n\n` +
    `내일 뵈어요!`,

  // === v6 신규: 대기자 시스템 ===
  waitlist_received: (v: SmsVars) =>
    `[달팽이스쿨] ${v.name}님, 대기자 등록 감사해요 🐌\n\n` +
    `🎯 ${v.target} 대기 중 (현재 ${v.position}번째)\n` +
    `특별 멤버십 회원 100인 한정 프로그램이에요.\n` +
    `수요가 차면 가장 먼저 안내드릴게요.\n\n` +
    `그 전에 빌더 기초(30만) 먼저 체험해보셔도 좋아요.\n` +
    `문의: 카톡 sool9241`,

  waitlist_open_invite: (v: SmsVars) =>
    `[달팽이스쿨] 🎉 ${v.name}님, ${v.target} 오픈 안내!\n\n` +
    `대기해주셔서 감사해요. 드디어 열립니다.\n` +
    `📅 ${v.date}부터 신청 가능\n` +
    `👥 ${v.seats}명 한정\n` +
    `💎 ${v.bonus}\n\n` +
    `🔗 ${v.link}\n\n` +
    `대기자 우선 24시간, 이후 일반 공개돼요.`,

  // === v6 신규: 멤버십 자격 부여 ===
  membership_granted_yearly: (v: SmsVars) =>
    `[달팽이스쿨] ${v.name}님, 1년 멤버십 자격 획득 🎉\n\n` +
    `빌더 기본 결제가 확인됐어요.\n` +
    `이제 ${v.name}님은 달팽이스쿨 1년 멤버예요.\n\n` +
    `💎 혜택\n` +
    `- 월 1회 라이브 워크샵 (12개월 12개 서비스)\n` +
    `- 주간 커뮤니티 Q&A\n` +
    `- 녹화본 영구 소장\n\n` +
    `멤버 전용 커뮤니티 초대는 카톡 sool9241로!`,

  membership_granted_lifetime: (v: SmsVars) =>
    `[달팽이스쿨] ${v.name}님, 평생 멤버십 자격 획득 🌟\n\n` +
    `빌더 프리미엄 1박2일 신청 확인됐어요.\n` +
    `이제 ${v.name}님은 달팽이스쿨 평생 멤버예요.\n\n` +
    `💎 평생 혜택\n` +
    `- 1년 멤버십 전체 혜택\n` +
    `- 모든 기수 재참여 무료\n` +
    `- 솔 1:1 연 2회 전략 상담\n` +
    `- 신규 프로그램 베타 우선 초대\n` +
    `- 달팽이 OS SaaS 얼리 액세스\n\n` +
    `함께 오래 가요 🐌`,
} as const;

export type TemplateKey = keyof typeof smsTemplates;

function signRequest() {
  const date = new Date().toISOString();
  const salt = crypto.randomBytes(32).toString("hex");
  const data = date + salt;
  const signature = crypto
    .createHmac("sha256", SOLAPI_API_SECRET)
    .update(data)
    .digest("hex");
  return {
    Authorization: `HMAC-SHA256 apiKey=${SOLAPI_API_KEY}, date=${date}, salt=${salt}, signature=${signature}`,
  };
}

export async function sendSms(
  phone: string,
  template: TemplateKey,
  vars: SmsVars
) {
  const message = smsTemplates[template](vars);
  const bytes = new TextEncoder().encode(message).length;
  const isLMS = bytes > 90;

  const res = await fetch("https://api.solapi.com/messages/v4/send", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...signRequest() },
    body: JSON.stringify({
      message: {
        to: phone.replace(/-/g, ""),
        from: SENDER,
        type: isLMS ? "LMS" : "SMS",
        text: message,
        ...(isLMS && { subject: "달팽이스쿨 알림" }),
      },
    }),
  });

  const result = await res.json();
  return { success: res.ok, result };
}
