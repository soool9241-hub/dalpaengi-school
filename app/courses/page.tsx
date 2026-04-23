import Link from "next/link";
import { Nav } from "@/components/shared/nav";
import { KakaoChatBtn } from "@/components/shared/kakao-chat-btn";
import { FloatingCTA } from "@/components/shared/floating-cta";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COURSES } from "@/lib/constants";

export const metadata = {
  title: "빌더코스 전체",
  description: "빌더 기초 / 기본 / 프리미엄 3단 비교",
};

// /courses - v6 3단 비교 페이지
export default function CoursesIndex() {
  const tiers = [
    {
      id: "basic" as const,
      course: COURSES.basic,
      tier: "체험형",
      tierColor: "bg-muted text-foreground/70",
      status: { label: "상시 신청 가능", color: "bg-brand-green text-white" },
      bonus: "🎁 펜션 10만원 할인권",
      priceStrip: "30만원",
      ctaLabel: "신청하기 →",
      ctaHref: "/apply?course=basic",
      isBest: false,
    },
    {
      id: "standard" as const,
      course: COURSES.standard,
      tier: "활용형",
      tierColor: "bg-brand-green/10 text-brand-green-dark",
      status: { label: "SOLD OUT · 100인 한정", color: "bg-red-500 text-white" },
      bonus: "💎 1년 멤버십 자격",
      priceStrip: "60만원",
      ctaLabel: "대기자 등록 →",
      ctaHref: "/courses/standard",
      isBest: true,
    },
    {
      id: "premium" as const,
      course: COURSES.premium,
      tier: "프리미엄",
      tierColor: "bg-amber-100 text-amber-800",
      status: { label: "SOLD OUT · 100인 한정", color: "bg-red-500 text-white" },
      bonus: "🌟 평생 멤버십 자격",
      priceStrip: "120만원",
      ctaLabel: "대기자 등록 →",
      ctaHref: "/courses/premium",
      isBest: false,
    },
  ];

  return (
    <>
      <Nav />
      <main className="flex-1 pt-28 pb-24">
        <div className="container-normal">
          <div className="text-center mb-12 space-y-4 max-w-2xl mx-auto">
            <Badge className="bg-brand-green text-white border-0">
              빌더코스 1기 · 첫 런칭 · 오직 1개
            </Badge>
            <h1 className="headline-lg">
              한날 한시에 모여,
              <br />
              각자의 서비스를 만들고 배포합니다.
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              세 개의 단계, 세 개의 깊이.
              <br />한 번의 체험부터 평생의 동반까지 — 원하시는 깊이를 선택하세요.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {tiers.map((t) => (
              <Card
                key={t.id}
                className={`relative border-0 bg-white p-7 space-y-4 flex flex-col transition-all ${
                  t.isBest ? "ring-2 ring-brand-green" : ""
                }`}
              >
                {t.isBest && (
                  <Badge className="absolute -top-3 right-6 bg-brand-green text-white border-0">
                    BEST
                  </Badge>
                )}
                <Badge
                  className={`w-fit border-0 text-[10px] ${t.status.color}`}
                >
                  {t.status.label}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`w-fit border-0 ${t.tierColor}`}
                >
                  {t.tier} · {t.course.duration}
                </Badge>

                <div>
                  <h3 className="text-xl font-bold">{t.course.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t.course.tagline}
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-brand-green-dark">
                    {t.priceStrip}
                  </span>
                </div>

                <div className="rounded-lg bg-brand-green/5 border border-brand-green/20 px-3 py-2.5">
                  <p className="text-xs text-brand-green-dark font-semibold">
                    {t.bonus}
                  </p>
                </div>

                <div className="flex-1" />

                <Button asChild className="rounded-full w-full h-11">
                  <Link href={t.ctaHref}>{t.ctaLabel}</Link>
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 space-y-3 max-w-xl mx-auto">
            <p className="text-sm text-muted-foreground">
              기본·프리미엄은 수요가 차면 오픈됩니다.
              <br />
              대기자 먼저 등록하시면 가장 먼저 안내드려요.
            </p>
          </div>
        </div>
      </main>
      <FloatingCTA />
      <KakaoChatBtn />
    </>
  );
}
