"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/shared/nav";
import { KakaoChatBtn } from "@/components/shared/kakao-chat-btn";
import { FloatingCTA } from "@/components/shared/floating-cta";
import { Footer } from "@/components/landing/footer";
import { Roadmap } from "@/components/landing/roadmap";
import { ThreeTracks } from "@/components/landing/three-tracks";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { WaitlistCounter } from "@/components/waitlist/waitlist-counter";

const benefits = [
  { icon: "🎥", label: "월 1회 4시간 라이브 워크샵", desc: "12개월 동안 12개 서비스 함께 제작" },
  { icon: "💬", label: "주간 커뮤니티 Q&A", desc: "디스코드 전용 채널" },
  { icon: "📚", label: "녹화본 평생 소장", desc: "언제든 다시 볼 수 있어요" },
  { icon: "🎯", label: "솔 1:1 연 2회 전략 상담", desc: "30분씩 · 개인별 로드맵" },
  { icon: "💰", label: "빌더코스 50% 할인", desc: "재수강 시 절반 가격" },
  { icon: "🚀", label: "졸업 후 우선권", desc: "퍼널 설계자 양성 과정 우선 초대" },
];

export default function SchoolPage() {
  const [done, setDone] = useState<{ position: number } | null>(null);

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* 히어로 */}
        <section className="pt-32 pb-16 md:pt-40">
          <div className="container-narrow text-center space-y-6">
            <Badge variant="secondary" className="border-0">
              1기 COMING SOON
            </Badge>
            <h1 className="headline-lg">
              1년간 12개의 서비스를
              <br />
              함께 만드는 멤버십
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              달팽이멤버십은 빌더코스 수료자를 우선 초대하는 1년 멤버십이에요.
              <br />
              빌더 기본 · 프리미엄 수강자에게는 멤버십 자격이 자동 부여돼요.
            </p>
          </div>
        </section>

        {/* 스쿨이란 */}
        <section className="section-padding-sm bg-white">
          <div className="container-normal">
            <div className="text-center mb-10 space-y-2">
              <p className="text-sm text-muted-foreground tracking-widest uppercase">
                What is 달팽이멤버십
              </p>
              <h2 className="headline-md">매달 하나씩, 같이 만들어요</h2>
            </div>
            <ul className="max-w-xl mx-auto space-y-3 text-base text-foreground/80">
              <li className="flex gap-3">
                <span className="text-brand-green-dark">✓</span>
                매달 1개 서비스 완성
              </li>
              <li className="flex gap-3">
                <span className="text-brand-green-dark">✓</span>
                3트랙 (빌더 · 세일즈 · 쉐어) 병행 훈련
              </li>
              <li className="flex gap-3">
                <span className="text-brand-green-dark">✓</span>
                월 1회 4시간 라이브 + 녹화본 평생 소장
              </li>
              <li className="flex gap-3">
                <span className="text-brand-green-dark">✓</span>
                주간 커뮤니티 Q&A
              </li>
              <li className="flex gap-3">
                <span className="text-brand-green-dark">✓</span>
                1년 약정 · 연 일시불 시 17% 할인
              </li>
            </ul>
          </div>
        </section>

        <ThreeTracks />
        <Roadmap />

        {/* 멤버 혜택 */}
        <section className="section-padding-sm">
          <div className="container-normal">
            <div className="text-center mb-10 space-y-2">
              <p className="text-sm text-muted-foreground tracking-widest uppercase">
                멤버 혜택
              </p>
              <h2 className="headline-md">1년 동안, 내 편</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {benefits.map((b) => (
                <Card
                  key={b.label}
                  className="border-0 bg-white p-6 flex gap-4 items-start"
                >
                  <span className="text-2xl flex-shrink-0">{b.icon}</span>
                  <div>
                    <p className="font-semibold">{b.label}</p>
                    <p className="text-sm text-muted-foreground mt-1">{b.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 가격 (작게) */}
        <section className="section-padding-sm">
          <div className="container-narrow">
            <div className="text-center space-y-3 text-sm text-muted-foreground">
              <p className="text-xs tracking-widest uppercase">가격</p>
              <p className="text-base">
                월 <span className="font-bold text-foreground">100,000원</span> · 최소
                1년 약정
              </p>
              <p>
                연 일시불 시{" "}
                <span className="font-bold text-brand-green-dark">1,000,000원</span>{" "}
                (17% 할인)
              </p>
            </div>
          </div>
        </section>

        {/* 대기자 등록 폼 */}
        <section className="section-padding-sm bg-brand-paper" id="waitlist">
          <div className="container-narrow max-w-xl">
            <div className="text-center mb-8 space-y-3">
              <Badge className="bg-brand-green text-white border-0">
                대기자 등록
              </Badge>
              <h2 className="headline-md">가장 먼저 소식 받기</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                오픈할 때 대기자에게 먼저 안내드려요.
                <br />빌더 기본·프리미엄 수강자는 자동 자격 부여.
              </p>
              <WaitlistCounter targetType="school" className="mx-auto mt-2" />
            </div>

            {done ? (
              <div className="rounded-2xl bg-white p-8 text-center space-y-4">
                <div className="text-4xl">🎉</div>
                <p className="text-lg font-semibold">
                  대기자 {done.position}번째 등록 완료!
                </p>
                <Button asChild className="rounded-full">
                  <Link href="/success/applied">다음 스텝 보기</Link>
                </Button>
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-6 md:p-8 border border-brand-line">
                <WaitlistForm
                  targetType="school"
                  showSchoolExtras
                  onSuccess={(info) => setDone(info)}
                />
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
      <KakaoChatBtn />
    </>
  );
}
