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

export default function StandardCoursePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const std = COURSES.standard;

  const sessions = [
    {
      time: "Part 1 (2시간)",
      title: "아이디어 → 구조 설계",
      desc: ["페르소나 정의", "핵심 기능 3개 도출", "Claude Code 프롬프트 설계"],
    },
    {
      time: "Part 2 (2시간)",
      title: "집중 개발",
      desc: ["Supabase 연동 (DB 저장)", "핵심 기능 구현", "스타일링 (Tailwind)"],
    },
    {
      time: "Part 3 (1시간)",
      title: "배포 + 수정 + 재배포",
      desc: ["Vercel 배포", "실 사용 테스트", "피드백 반영 → 재배포"],
    },
    {
      time: "Part 4 (1시간)",
      title: "확장 + 공유",
      desc: ["Solapi SMS 연동 (알림 자동화)", "멤버 전용 커뮤니티 소개"],
    },
  ];

  return (
    <>
      <Nav />
      <main className="flex-1">
        <CourseDetailHero
          badge="SOLD OUT · 100인 한정"
          badgeColor="red"
          title="나만의 웹 서비스를 만들고, 배포하고, 수정까지 완성"
          subtitle="한날 한시에 모여 · 서로 다른 직군 · 각자 자신의 서비스를"
          tagline={`${std.duration} · ${std.name}`}
        />

        <div className="flex justify-center pb-8">
          <WaitlistCounter targetType="course_standard" />
        </div>

        <CourseCurriculum title={std.name + " · 커리큘럼 공개"} sessions={sessions} />

        <CourseBonus kind="yearly" />

        {/* 결과물 */}
        <section className="section-padding-sm">
          <div className="container-narrow">
            <div className="rounded-2xl bg-white p-8 space-y-4 border border-brand-line">
              <h3 className="text-lg font-semibold">결과물</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ 본인 사업에 즉시 쓸 수 있는 웹 서비스 1개</li>
                <li>✓ Supabase DB 연동 (고객 데이터 저장)</li>
                <li>✓ Solapi SMS 연동 (알림 자동화)</li>
                <li>✓ Vercel 배포 + 커스텀 도메인 가이드</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SOLD OUT CTA */}
        <section className="section-padding-sm">
          <div className="container-narrow">
            <div className="rounded-3xl bg-foreground text-background p-8 md:p-10 text-center space-y-6">
              <div className="space-y-2">
                <p className="text-sm opacity-80">정가</p>
                <p className="text-4xl font-bold">
                  {std.regularPrice.toLocaleString()}원
                </p>
                <p className="text-xs opacity-80">
                  결제 확인 즉시 달팽이스쿨 1년 멤버십 자격 자동 부여
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
        targetType="course_standard"
      />
      <FloatingCTA />
      <KakaoChatBtn />
    </>
  );
}
