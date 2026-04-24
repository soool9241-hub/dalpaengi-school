"use client";

import { useState } from "react";
import { Nav } from "@/components/shared/nav";
import { KakaoChatBtn } from "@/components/shared/kakao-chat-btn";
import { FloatingCTA } from "@/components/shared/floating-cta";
import { Button } from "@/components/ui/button";
import { CourseDetailHero } from "@/components/courses/course-detail-hero";
import { CourseCurriculum } from "@/components/courses/course-curriculum";
import { CourseBonus } from "@/components/courses/course-bonus";
import { WaitlistModal } from "@/components/waitlist/waitlist-modal";
import { WaitlistCounter } from "@/components/waitlist/waitlist-counter";
import { COURSES } from "@/lib/constants";

export default function PremiumCoursePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const pre = COURSES.premium;

  const sessions = [
    {
      time: "Day 1 · 10:00~12:00",
      title: "최적화 환경 세팅",
      desc: [
        "Cursor + Claude Code 세팅",
        "Supabase/Vercel/Solapi 계정 준비",
        "필수 툴 설치",
      ],
    },
    {
      time: "Day 1 · 13:00~15:00",
      title: "아이디어 구체화 (솔 1:1)",
      desc: ["개인별 사업 진단", "MVP 기능 3개 확정", "수익 모델 점검"],
    },
    {
      time: "Day 1 · 15:00~19:00",
      title: "집중 개발 1",
      desc: ["DB 설계", "핵심 기능 개발"],
    },
    {
      time: "Day 1 · 20:00~22:00",
      title: "저녁 네트워킹 + 회고",
    },
    {
      time: "Day 2 · 09:00~12:00",
      title: "집중 개발 2",
      desc: ["기능 완성도 높이기", "UI/UX 다듬기"],
    },
    {
      time: "Day 2 · 13:00~15:00",
      title: "배포 + 실전 테스트",
      desc: ["Vercel 배포", "실제 고객 데이터 입력 테스트"],
    },
    {
      time: "Day 2 · 15:00~17:00",
      title: "솔 1:1 피드백 세션",
      desc: ["개인별 30분", "개선 포인트 리스트업", "3개월 로드맵 수립"],
    },
    {
      time: "Day 2 · 17:00~18:00",
      title: "발표 · 졸업 · 특별 혜택 인증",
    },
  ];

  return (
    <>
      <Nav />
      <main className="flex-1">
        <CourseDetailHero
          badge="SOLD OUT · 100인 한정"
          badgeColor="red"
          title="1박 2일, 최적화된 환경에서 처음부터 끝까지"
          subtitle="솔 1:1 피드백 · 오프라인 집중 · 100인 한정 프리미엄 혜택"
          tagline={`${pre.duration} · ${pre.name}`}
        />

        <div className="flex justify-center pb-8">
          <WaitlistCounter targetType="course_premium" />
        </div>

        <CourseCurriculum title={pre.name + " · 1박2일 일정"} sessions={sessions} />

        <CourseBonus kind="lifetime" />

        {/* 결과물 */}
        <section className="section-padding-sm">
          <div className="container-narrow">
            <div className="rounded-2xl bg-white p-8 space-y-4 border border-brand-line">
              <h3 className="text-lg font-semibold">결과물</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ 완성도 높은 수익형 웹 서비스 1개</li>
                <li>✓ 3개월 확장 로드맵 (솔 피드백 포함)</li>
                <li>✓ 1박 2일 합숙 동료 네트워크</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SOLD OUT CTA */}
        <section className="section-padding-sm">
          <div className="container-narrow">
            <div className="rounded-3xl bg-foreground text-background p-8 md:p-10 text-center space-y-6">
              <div className="space-y-2">
                <p className="text-sm opacity-80">정가 (숙박 · 식사 포함)</p>
                <p className="text-4xl font-bold">
                  {pre.regularPrice.toLocaleString()}원
                </p>
                <p className="text-xs opacity-80">
                  결제 확인 즉시 결제 확인 즉시 평생 특별 혜택 부여
                </p>
              </div>
              <div className="inline-flex flex-col gap-3 w-full max-w-sm mx-auto">
                <Button
                  size="lg"
                  onClick={() => setModalOpen(true)}
                  className="rounded-full h-12 bg-red-500 text-white hover:bg-red-600"
                >
                  🔒 SOLD OUT · 대기자 등록하기
                </Button>
                <p className="text-xs opacity-70">
                  수요가 차면 가장 먼저 안내드려요
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WaitlistModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        targetType="course_premium"
      />
      <FloatingCTA />
      <KakaoChatBtn />
    </>
  );
}
