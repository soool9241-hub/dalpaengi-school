// 🐌 달팽이스쿨 v6 사이트 상수

export const SITE = {
  name: "달팽이스쿨",
  tagline: "누구나 할 순 있지만, 아무나 할 순 없습니다.",
  description:
    "1년간 12개의 서비스를 함께 만드는 멤버십. 빌더코스에서 먼저 만나봐요. 🐌",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dalpaengi-school.kr",
  kakaoChannel: process.env.NEXT_PUBLIC_KAKAO_CHANNEL || "sool9241",
  phone: "010-8531-9531",
  email: "help@healingstay.com",
} as const;

// 절대 수정 금지 - 3대 핵심 카피 (사이트 전체 반복)
export const CORE_COPY = {
  identity: "누구나 할 순 있지만, 아무나 할 순 없습니다.",
  journey: "1년간 12개의 서비스.\n내 손으로 직접 만들고, 내가 사용합니다.",
  outcome: "지속 가능한 수익형 웹앱 서비스를\n함께 만들어갑니다.",
} as const;

// v6 시그니처 선언문 4종 (반복 노출)
export const DECLARATIONS = {
  daily365:
    "우리는 365일간,\n사람들이 사랑하는 서비스를\n만들고 · 팔고 · 공유합니다.",
  serviceGoals: [
    { num: "01", name: "빠르게", desc: "오래 끌지 않습니다. 작게 시작해서 빠르게 배포합니다." },
    { num: "02", name: "반복적인 매출", desc: "일회성이 아닙니다. 매달 돌아오는 구조로 만듭니다." },
    { num: "03", name: "상방이 뚫린 수익 구조", desc: "한계가 정해진 시간 노동이 아닙니다. 확장 가능한 구조로." },
  ],
  builderIdentity:
    "우리는 한날 한시에 모여\n서로 다른 직군의 사람들과\n각자 자신만의 서비스를 만들고 배포합니다.",
  launchOnly:
    "달팽이스쿨 첫 번째 프로그램으로\n빌더코스를 런칭합니다. 오직 1개.",
} as const;

// 3트랙 커리큘럼
export const TRACKS = [
  { emoji: "🔨", name: "빌더 트랙", desc: "작은 것이라도 잘 만들어 내는 방법을 고민합니다", color: "text-brand-green-dark" },
  { emoji: "💰", name: "세일즈 트랙", desc: "만들어진 서비스/제품을 파는 방법을 연구합니다", color: "text-blue-700" },
  { emoji: "🤝", name: "쉐어 트랙", desc: "소비자에게 다가가기 위한 방법을 공유합니다", color: "text-amber-700" },
] as const;

// 3축 콘텐츠
export const CONTENT_AXES = [
  { emoji: "🏡", name: "60평 펜션 운영 자동화", sub: "달팽이아지트 · 7년 · 에어비앤비 5.0", desc: "예약·결제·고객관리·리뷰수집까지 실제로 운영 중인 시스템" },
  { emoji: "🔨", name: "120평 공방 운영 자동화", sub: "스토리팜 CNC · 조립공간 예약 시스템", desc: "CNC 제작·체험 예약·고객 DB까지 통합 관리" },
  { emoji: "🤖", name: "AI 자동화 시스템 만들기", sub: "Claude Code · Supabase · n8n · Solapi", desc: "비개발자도 만드는 실전 웹앱 · 실제로 돈 되는 시스템" },
] as const;

// v6: 3단 코스 구성 — 기초(상시) / 기본(SOLD OUT) / 프리미엄(SOLD OUT)
export const COURSES = {
  basic: {
    id: "basic",
    name: "빌더 기초",
    duration: "3시간",
    tagline: "웹 서비스 하나, 3시간에 만들고 배포하는 체험",
    regularPrice: 300000,
    earlybirdPrice: 250000,
    status: "open" as const, // 상시 신청
    bonus: "60평 펜션 10만원 할인권 제공",
    membershipGrant: null,
  },
  standard: {
    id: "standard",
    name: "빌더 기본",
    duration: "6시간",
    tagline: "나만의 웹 서비스를 만들고, 배포하고, 수정까지 완성",
    regularPrice: 600000,
    earlybirdPrice: null,
    status: "soldout" as const, // 대기자제
    bonus: "100인 한정 · 특별 혜택 제공",
    membershipGrant: "yearly_1year" as const, // 백엔드 유지 · UI 노출 X
  },
  premium: {
    id: "premium",
    name: "빌더 프리미엄",
    duration: "24시간 · 1박 2일",
    tagline: "최적화된 환경에서 처음부터 끝까지 · 솔 1:1 피드백",
    regularPrice: 1200000,
    earlybirdPrice: null,
    status: "soldout" as const, // 대기자제
    bonus: "100인 한정 · 프리미엄 특별 혜택",
    membershipGrant: "lifetime" as const, // 백엔드 유지 · UI 노출 X
  },
} as const;

export type CourseId = keyof typeof COURSES;

// v6 대기자 target_type 라벨
export const WAITLIST_TARGET_LABEL = {
  course_standard: "빌더 기본 (6시간)",
  course_premium: "빌더 프리미엄 (1박2일)",
  school: "달팽이스쿨 1년 멤버십",
} as const;

export const COHORT = {
  current: Number(process.env.NEXT_PUBLIC_COHORT || 1),
  earlybirdDeadline:
    process.env.NEXT_PUBLIC_EARLYBIRD_DEADLINE ||
    "2026-05-25T23:59:59+09:00",
} as const;

export const NAV_LINKS = [
  { label: "빌더코스", href: "/courses" },
  { label: "사례", href: "/cases" },
  { label: "무료 라이브", href: "/live" },
] as const;

// FAQ (메인 랜딩) - 빌더코스 중심
export const FAQ_ITEMS = [
  { q: "코딩을 전혀 몰라도 되나요?", a: "네, 괜찮아요. 복사 붙여넣기만 할 줄 알면 충분해요. AI한테 한국어로 말하면 만들어줘요." },
  { q: "3개 프로그램의 차이가 뭔가요?", a: "빌더 기초(3시간·30만)는 체험형이에요. 빌더 기본(6시간·60만)은 활용형 · 나만의 서비스를 완성해요. 빌더 프리미엄(1박2일·120만)은 최적화된 환경에서 솔 1:1 피드백까지 받아요." },
  { q: "온라인으로만 하나요?", a: "기초·기본은 온라인 줌 중심이에요. 전국 어디서든 참여할 수 있어요. 프리미엄(1박2일)은 완주 오프라인으로 진행돼요." },
  { q: "환불 정책이 궁금해요.", a: "빌더코스는 수강일 7일 전까지 100% 환불, 3일 전까지 50% 환불이에요. 자세한 건 카톡 sool9241로 문의주세요." },
  { q: "기본·프리미엄은 왜 SOLD OUT인가요?", a: "수요 기반으로 오픈해요. 대기자가 충분히 모이면 일괄 오픈 공지를 드려요. 대기 등록해두시면 가장 먼저 안내드릴게요." },
  { q: "왜 빌더코스 하나만 하세요? 다른 프로그램은 없나요?", a: "오직 1개만 먼저 합니다. 검증 안 된 여러 상품보다, 검증된 1개가 훨씬 강력해요. 빌더코스를 여러 기수 운영하면서 다져진 뒤 다른 프로그램을 순차 오픈합니다." },
] as const;
