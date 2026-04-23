import { Nav } from "@/components/shared/nav";
import { KakaoChatBtn } from "@/components/shared/kakao-chat-btn";
import { FloatingCTA } from "@/components/shared/floating-cta";
import { Footer } from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";
import { CaseCard } from "@/components/cases/case-card";
import { createServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "함께 만들었던 이야기들",
  description: "달팽이스쿨 · 빌더코스에서 함께 만든 서비스 사례",
};

export const dynamic = "force-dynamic";

type CaseRow = {
  id: string;
  title: string;
  category: "course" | "school" | "hackathon";
  description: string | null;
  case_date: string | null;
  participants: string | null;
  duration: string | null;
  highlights: string[] | null;
  testimonial: string | null;
  testimonial_name: string | null;
};

// DB 비어있을 때 보여줄 기본 사례 (제품이 성숙하면 DB로 교체)
const FALLBACK_CASES: CaseRow[] = [
  {
    id: "fallback-1",
    title: "3시간 만에 내 이름으로 된 예약 페이지",
    category: "course",
    description:
      "프리랜서 디자이너 지민이 자신의 포트폴리오 + 예약 기능을 직접 배포한 사례",
    case_date: "2026-04",
    participants: "기초 수강자 1인",
    duration: "3시간",
    highlights: [
      "Claude Code 첫 사용",
      "Vercel 배포까지 완료",
      "다음 날 첫 고객 예약 수신",
    ],
    testimonial:
      "외주 견적 300만원이었는데, 내가 만든 게 더 마음에 들어요.",
    testimonial_name: "지민 · 프리랜서 디자이너",
  },
  {
    id: "fallback-2",
    title: "카페 12개월 자동화 로드맵",
    category: "school",
    description: "멤버십 1기 · 매달 하나씩 쌓아가는 카페 사업 OS",
    case_date: "2026-03~2027-02",
    participants: "스쿨 멤버 1인",
    duration: "1년",
    highlights: [
      "M1 예약 시스템",
      "M2 고객 CRM",
      "M3 매출 대시보드",
    ],
    testimonial: null,
    testimonial_name: null,
  },
  {
    id: "fallback-3",
    title: "1박2일 프리미엄 합숙 · 8팀 동시 런칭",
    category: "hackathon",
    description:
      "빌더 프리미엄 1기 · 오프라인 1박2일 · 솔 1:1 피드백 + 평생 멤버십 자격 부여",
    case_date: "2026-09",
    participants: "프리미엄 수강자 8인",
    duration: "24시간",
    highlights: [
      "전원 Vercel 배포 완료",
      "8개 서비스 동시 런칭",
      "평생 멤버십 자격 부여",
    ],
    testimonial: null,
    testimonial_name: null,
  },
];

async function getCases(): Promise<CaseRow[]> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("cases")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (data && data.length > 0) return data as CaseRow[];
  } catch (e) {
    console.warn("[cases] fallback to default:", e);
  }
  return FALLBACK_CASES;
}

export default async function CasesPage() {
  const cases = await getCases();

  return (
    <>
      <Nav />
      <main className="flex-1 pt-28 pb-20">
        <section className="section-padding-sm">
          <div className="container-narrow text-center space-y-5 mb-12">
            <Badge className="bg-brand-green text-white border-0">Cases</Badge>
            <h1 className="headline-lg">함께 만들었던 이야기들</h1>
            <p className="text-muted-foreground leading-relaxed">
              체험에서 시작된 서비스,
              <br />
              멤버십에서 쌓여가는 사업 OS.
            </p>
          </div>

          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cases.map((c) => (
                <CaseCard
                  key={c.id}
                  title={c.title}
                  category={c.category}
                  description={c.description || undefined}
                  caseDate={c.case_date || undefined}
                  participants={c.participants || undefined}
                  duration={c.duration || undefined}
                  highlights={c.highlights || undefined}
                  testimonial={c.testimonial || undefined}
                  testimonialName={c.testimonial_name || undefined}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
      <KakaoChatBtn />
    </>
  );
}
