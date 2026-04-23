import Link from "next/link";
import { Nav } from "@/components/shared/nav";
import { KakaoChatBtn } from "@/components/shared/kakao-chat-btn";
import { FloatingCTA } from "@/components/shared/floating-cta";
import { Button } from "@/components/ui/button";
import { CourseDetailHero } from "@/components/courses/course-detail-hero";
import { CourseCurriculum } from "@/components/courses/course-curriculum";
import { CourseBonus } from "@/components/courses/course-bonus";
import { COURSES } from "@/lib/constants";

export const metadata = {
  title: "빌더 기초 · 3시간 체험",
  description: "웹 서비스 하나, 3시간에 만들고 배포하는 체험 · 펜션 10만원 할인권 보너스",
};

export default function BasicCoursePage() {
  const basic = COURSES.basic;

  const sessions = [
    { time: "13:00 ~ 13:20", title: "오프닝", desc: ["오늘 만들 것 소개", "서로 인사"] },
    { time: "13:20 ~ 14:00", title: "Claude Code 기초", desc: ["첫 프롬프트", "파일 구조 이해"] },
    { time: "14:00 ~ 15:00", title: "함께 만들기", desc: ["솔 시연 + 따라하기"] },
    { time: "15:00 ~ 15:40", title: "각자 커스터마이징 + 배포", desc: ["Vercel 배포"] },
    { time: "15:40 ~ 16:00", title: "발표 · 다음 단계", desc: ["각자 URL 공유", "Q&A"] },
  ];

  return (
    <>
      <Nav />
      <main className="flex-1">
        <CourseDetailHero
          badge="상시 신청 가능 · 3시간 체험형"
          badgeColor="green"
          title="웹 서비스 하나, 3시간에 만들고 배포하는 체험"
          subtitle="한날 한시에 모여 · 서로 다른 직군 · 각자 자신의 서비스를"
          tagline="🐌 AI 처음 써보는 분 · 코딩 경험 0도 OK"
        />

        <CourseCurriculum title={basic.name + " · " + basic.duration} sessions={sessions} />

        <CourseBonus kind="pension" />

        {/* 이런 분께 */}
        <section className="section-padding-sm">
          <div className="container-narrow">
            <div className="rounded-2xl bg-white p-8 space-y-4 border border-brand-line">
              <h3 className="text-lg font-semibold">이런 분께</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>☑ AI로 뭔가 만들어 보고 싶은데 어디서 시작할지 모르는 분</li>
                <li>☑ 외주 맡기기엔 예산이 부담스러운 1인 사업자</li>
                <li>☑ 한번 가볍게 경험해보고 싶은 분</li>
              </ul>
              <div className="pt-4 border-t border-brand-line">
                <p className="text-xs text-muted-foreground">
                  준비물 · 노트북 (Mac/Windows) + 만들고 싶은 서비스 아이디어 1~2개
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 가격 + CTA */}
        <section className="section-padding-sm">
          <div className="container-narrow">
            <div className="rounded-3xl bg-brand-green text-white p-8 md:p-10 text-center space-y-6">
              <div className="space-y-2">
                <p className="text-sm opacity-80">수강료</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-lg line-through opacity-60">
                    {basic.regularPrice.toLocaleString()}원
                  </span>
                  <span className="text-4xl font-bold">
                    {basic.earlybirdPrice.toLocaleString()}원
                  </span>
                </div>
                <p className="text-xs opacity-80">얼리버드 가격 · D-7까지</p>
              </div>
              <Button
                asChild
                size="lg"
                className="rounded-full h-12 bg-white text-brand-green-dark hover:bg-white/90 px-8"
              >
                <Link href="/apply?course=basic">🐌 빌더 기초 신청하기</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <FloatingCTA />
      <KakaoChatBtn />
    </>
  );
}
