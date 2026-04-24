import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COURSES } from "@/lib/constants";

// 빌더코스 모집 배너 - v6 3단 요약 · 한날 한시 선언
// SOLD OUT 모달은 /courses 페이지에서 활성 · 여기선 상세페이지로 유도
export function CoursesTeaser() {
  return (
    <section className="section-padding bg-brand-green/5">
      <div className="container-normal">
        <div className="text-center mb-12 space-y-4">
          <Badge className="bg-brand-green text-white border-0">
            1기 모집 중 · 첫 런칭 · 오직 1개
          </Badge>
          <h2 className="headline-md">
            한날 한시에 모여,
            <br />
            각자의 서비스를 만들고 배포합니다.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            서로 다른 직군의 사람들과 함께.
            <br />
            체험형 빌더 기초에서 먼저 만나보고,
            <br />
            더 깊게 만들고 싶으면 기본 · 프리미엄 대기자로 와요.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {/* 기초 (상시 신청) */}
          <Card className="border-0 bg-white p-7 space-y-4 flex flex-col">
            <Badge variant="secondary" className="w-fit bg-muted border-0">
              체험형 · 상시
            </Badge>
            <div>
              <h3 className="text-xl font-bold">{COURSES.basic.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {COURSES.basic.duration} · {COURSES.basic.tagline}
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-brand-green-dark">30만</span>
              <span className="text-muted-foreground text-sm">원</span>
            </div>
            <p className="text-[11px] text-brand-green-dark">
              🎁 펜션 10만원 할인권 증정
            </p>
            <div className="flex-1" />
            <Button asChild className="rounded-full w-full">
              <Link href="/courses/basic">기초 자세히 보기</Link>
            </Button>
          </Card>

          {/* 기본 (SOLD OUT · 대기자) - BEST */}
          <Card className="relative border-2 border-brand-green bg-white p-7 space-y-4 flex flex-col">
            <Badge className="absolute -top-3 right-6 bg-brand-green text-white border-0">
              BEST
            </Badge>
            <Badge className="absolute -top-3 left-6 bg-red-500 text-white border-0">
              SOLD OUT
            </Badge>
            <Badge
              variant="secondary"
              className="w-fit bg-brand-green/10 text-brand-green-dark border-0"
            >
              활용형 · 100인 한정
            </Badge>
            <div>
              <h3 className="text-xl font-bold">{COURSES.standard.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {COURSES.standard.duration} · {COURSES.standard.tagline}
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-brand-green-dark">60만</span>
              <span className="text-muted-foreground text-sm">원</span>
            </div>
            <p className="text-[11px] text-brand-green-dark font-semibold">
              🎁 100인 한정 · 특별 혜택
            </p>
            <div className="flex-1" />
            <Button asChild className="rounded-full w-full">
              <Link href="/courses/standard">대기자 등록하기</Link>
            </Button>
          </Card>

          {/* 프리미엄 (SOLD OUT · 대기자) */}
          <Card className="relative border-0 bg-white p-7 space-y-4 flex flex-col">
            <Badge className="absolute -top-3 left-6 bg-red-500 text-white border-0">
              SOLD OUT
            </Badge>
            <Badge
              variant="secondary"
              className="w-fit bg-amber-100 text-amber-800 border-0"
            >
              프리미엄 · 100인 한정
            </Badge>
            <div>
              <h3 className="text-xl font-bold">{COURSES.premium.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {COURSES.premium.duration} · {COURSES.premium.tagline}
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-brand-green-dark">120만</span>
              <span className="text-muted-foreground text-sm">원</span>
            </div>
            <p className="text-[11px] text-brand-green-dark font-semibold">
              🌟 100인 한정 · 프리미엄 특별 혜택
            </p>
            <div className="flex-1" />
            <Button asChild className="rounded-full w-full">
              <Link href="/courses/premium">대기자 등록하기</Link>
            </Button>
          </Card>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-lg mx-auto">
          기본·프리미엄은 수요가 차면 오픈됩니다. 대기자 먼저 등록해 주세요.
        </p>
      </div>
    </section>
  );
}
