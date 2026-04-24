"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/shared/nav";
import { KakaoChatBtn } from "@/components/shared/kakao-chat-btn";
import { Footer } from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LiveRegisterForm } from "@/components/live/live-register-form";

// 5/24 AI 빌딩 데이 - "라이브로 무엇이든 만들어드려요" 첫 특강
const EVENT_DATE = "2026-05-24";
const EVENT_TOPIC = "AI 빌딩 데이 · 라이브로 무엇이든 만들어드려요";
const EVENT_SEATS = 100;

// 다음 주 토 무료 라이브 날짜
function getNextSaturday(): string {
  const today = new Date();
  const day = today.getDay();
  const diff = (6 - day + 7) % 7 || 7;
  const sat = new Date(today);
  sat.setDate(today.getDate() + diff);
  return sat.toISOString().split("T")[0];
}

const archive = [
  { date: "2026-04-19", title: "펜션 예약 자동화 구조 해부 · Supabase + Cron", channel: "Zoom 녹화" },
  { date: "2026-04-12", title: "Solapi SMS 시퀀스 · 예약 D-1 자동 발송", channel: "Zoom 녹화" },
  { date: "2026-04-05", title: "리뷰 자동 수집 파이프라인 · n8n 연동", channel: "Zoom 녹화" },
];

export default function LivePage() {
  const [filled, setFilled] = useState<number | null>(null);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const regularDate = getNextSaturday();

  useEffect(() => {
    fetch(`/api/live/count?live_date=${EVENT_DATE}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setFilled(j.count ?? 0))
      .catch(() => setFilled(0));

    const target = new Date(`${EVENT_DATE}T00:00:00+09:00`).getTime();
    setDaysLeft(Math.max(0, Math.ceil((target - Date.now()) / (1000 * 60 * 60 * 24))));
  }, []);

  const remaining = filled !== null ? Math.max(0, EVENT_SEATS - filled) : null;
  const isFull = remaining !== null && remaining === 0;

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* 1. 특강 히어로 — AI 빌딩 데이 */}
        <section className="relative pt-32 pb-16 md:pt-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green-dark via-brand-green-dark to-foreground pointer-events-none" />
          <div
            aria-hidden
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-brand-green/15 blur-3xl pointer-events-none"
          />

          <div className="relative container-narrow text-center space-y-6 text-white">
            <div className="inline-flex flex-wrap items-center justify-center gap-2">
              <Badge className="bg-red-500 text-white border-0 tracking-widest">
                🔴 LIVE 특강
              </Badge>
              <Badge className="bg-white/15 text-white border-0">
                선착순 {EVENT_SEATS}명
              </Badge>
              {daysLeft !== null && daysLeft > 0 && (
                <Badge className="bg-white/15 text-white border-0">
                  D-{daysLeft}
                </Badge>
              )}
              {isFull && (
                <Badge className="bg-foreground text-white border-0">마감</Badge>
              )}
            </div>

            <p className="text-xs text-white/60 tracking-widest uppercase">
              2026.05.24 · SAT · 10:00~18:00
            </p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              AI 빌딩 데이
              <br />
              <span className="text-brand-green">
                라이브로 무엇이든 만들어드려요
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              하루 동안 · 솔이 직접 라이브로
              <br />
              여러분이 원하는 서비스를 즉석에서 만들어드립니다.
            </p>
          </div>
        </section>

        {/* 2. 무엇을 만들어드리나 */}
        <section className="section-padding-sm bg-white">
          <div className="container-normal">
            <div className="text-center mb-10 space-y-2">
              <p className="text-sm text-muted-foreground tracking-widest uppercase">
                이런 걸 만들어드려요
              </p>
              <h2 className="headline-md">
                &ldquo;이거 하나만 있으면&rdquo; 싶었던 것들
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { emoji: "📅", t: "예약 시스템", d: "고객이 직접 달력에서 날짜 고르고 예약" },
                { emoji: "👥", t: "고객 CRM", d: "이름·연락처·방문 이력 자동 저장" },
                { emoji: "📲", t: "자동 알림 SMS", d: "예약 D-1 리마인드 · 방문 감사 문자" },
                { emoji: "💳", t: "결제 연동", d: "토스·카카오페이로 온라인 결제" },
                { emoji: "📝", t: "신청 폼 + DB", d: "랜딩페이지에서 바로 접수받기" },
                { emoji: "✨", t: "그 외 무엇이든", d: "아이디어만 가져오시면 같이 만들어요" },
              ].map((item) => (
                <Card
                  key={item.t}
                  className="border-0 bg-brand-paper p-6 space-y-2"
                >
                  <div className="text-3xl">{item.emoji}</div>
                  <p className="font-semibold">{item.t}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.d}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 3. 특강 상세 스펙 */}
        <section className="section-padding-sm">
          <div className="container-narrow">
            <Card className="border-0 bg-white p-8 space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <Badge className="bg-brand-green text-white border-0">
                  특강 스펙
                </Badge>
                <span className="text-sm font-semibold">
                  📅 {EVENT_DATE} (토) 10:00 ~ 18:00
                </span>
              </div>
              <ul className="space-y-2.5 text-sm">
                <li className="flex gap-2">
                  <span className="text-brand-green-dark">✓</span>
                  <span>
                    <b>줌 라이브 · 무료</b> · 전국 어디서든 노트북만 있으면 OK
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-green-dark">✓</span>
                  <span>
                    <b>참가자 아이디어 실시간 투표</b> · 솔이 직접 만들어 보여드려요
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-green-dark">✓</span>
                  <span>
                    <b>화면 공유 시연</b> · Claude Code · Supabase · Vercel 전 과정
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-green-dark">✓</span>
                  <span>
                    <b>녹화본 제공</b> · 다시 보면서 따라 만들 수 있어요
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-green-dark">✓</span>
                  <span>
                    <b>30일 카톡 질문 지원</b> · 만들다 막히면 언제든
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* 4. 신청 폼 + 선착순 카운터 */}
        <section
          id="apply"
          className="section-padding-sm bg-brand-paper scroll-mt-20"
        >
          <div className="container-narrow max-w-xl">
            <div className="text-center mb-8 space-y-3">
              <Badge className="bg-red-500 text-white border-0 tracking-widest">
                🔴 선착순 {EVENT_SEATS}명 한정
              </Badge>
              <h2 className="headline-md">지금 신청하기</h2>
              {filled !== null && (
                <div className="space-y-2 max-w-sm mx-auto">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {isFull ? (
                        "마감"
                      ) : (
                        <>
                          잔여{" "}
                          <span className="font-bold text-red-500">
                            {remaining}
                          </span>
                          석 / {EVENT_SEATS}석
                        </>
                      )}
                    </span>
                    <span className="text-muted-foreground">
                      {filled}명 신청 완료
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-brand-line overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-brand-green transition-all"
                      style={{
                        width: `${Math.min(100, (filled / EVENT_SEATS) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-white p-6 md:p-8 border border-brand-line">
              {isFull ? (
                <div className="text-center py-8 space-y-4">
                  <div className="text-4xl">🙇‍♀️</div>
                  <p className="text-lg font-bold text-foreground">
                    선착순 {EVENT_SEATS}명 마감되었어요
                  </p>
                  <p className="text-sm text-muted-foreground">
                    다음 회차 안내를 받으시려면 카톡 sool9241로 남겨주세요.
                  </p>
                </div>
              ) : (
                <LiveRegisterForm liveDate={EVENT_DATE} liveTopic={EVENT_TOPIC} />
              )}
            </div>
          </div>
        </section>

        {/* 5. 매주 토 정기 줌 라이브 (하위 섹션) */}
        <section className="section-padding-sm">
          <div className="container-narrow max-w-2xl">
            <div className="text-center mb-6 space-y-2">
              <p className="text-xs text-muted-foreground tracking-widest uppercase">
                매주 정기 줌 라이브
              </p>
              <h3 className="text-2xl font-bold">
                토요일 저녁 8시 · 무료
              </h3>
              <p className="text-sm text-muted-foreground">
                솔이 직접 운영 중인 시스템을 화면 공유로 해부해요.
              </p>
            </div>
            <Card className="border-0 bg-white p-6 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <Badge variant="secondary" className="border-0">
                  이번 주 정기
                </Badge>
                <span className="text-xs text-muted-foreground">
                  📅 {regularDate} (토) 20:00 · Zoom
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                자동화 시스템의 구조를 한 시간 동안 뜯어봅니다. 화면 공유 시연
                + Q&A.
              </p>
              <LiveRegisterForm
                liveDate={regularDate}
                liveTopic="매주 토 정기 줌 라이브 · 자동화 시스템 구조 해부"
              />
            </Card>
          </div>
        </section>

        {/* 6. 아카이브 */}
        <section className="section-padding-sm">
          <div className="container-normal">
            <div className="text-center mb-8 space-y-2">
              <p className="text-sm text-muted-foreground tracking-widest uppercase">
                지난 줌 라이브
              </p>
              <h2 className="headline-md">아카이브</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {archive.map((a) => (
                <Card
                  key={a.date}
                  className="border-0 bg-brand-paper p-6 space-y-2"
                >
                  <p className="text-xs text-muted-foreground">{a.date}</p>
                  <p className="font-semibold">{a.title}</p>
                  <p className="text-xs text-brand-green-dark">📹 {a.channel}</p>
                </Card>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-6">
              녹화본은 신청자 전용 링크로 공유됩니다
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <KakaoChatBtn />
    </>
  );
}
