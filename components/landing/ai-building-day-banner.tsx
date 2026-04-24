"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const EVENT_DATE = "2026-05-24";
const EVENT_SEATS = 100;

// 🎯 5/24 AI 빌딩 데이 모객 배너 - 메인 히어로 바로 아래
// "라이브로 무엇이든 만들어드려요" 서비스의 첫 특강
export function AiBuildingDayBanner() {
  const [filled, setFilled] = useState<number | null>(null);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/live/count?live_date=${EVENT_DATE}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setFilled(j.count ?? 0))
      .catch(() => setFilled(0));

    const target = new Date(`${EVENT_DATE}T00:00:00+09:00`).getTime();
    const now = Date.now();
    setDaysLeft(Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24))));
  }, []);

  const remaining =
    filled !== null ? Math.max(0, EVENT_SEATS - filled) : null;
  const isFull = remaining !== null && remaining === 0;

  return (
    <section className="section-padding-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-green-dark via-brand-green-dark to-foreground pointer-events-none" />
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-green/20 blur-3xl pointer-events-none"
      />

      <div className="relative container-normal">
        <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-red-500 text-white border-0 tracking-widest">
                  🔴 LIVE 특강
                </Badge>
                <Badge className="bg-white/15 text-white border-0 backdrop-blur-sm">
                  선착순 {EVENT_SEATS}명
                </Badge>
                {daysLeft !== null && daysLeft > 0 && (
                  <Badge className="bg-white/15 text-white border-0 backdrop-blur-sm">
                    D-{daysLeft}
                  </Badge>
                )}
                {isFull && (
                  <Badge className="bg-foreground text-white border-0">
                    마감
                  </Badge>
                )}
              </div>

              <div>
                <p className="text-xs text-white/60 tracking-widest uppercase mb-2">
                  2026.05.24 · SAT
                </p>
                <h2 className="text-3xl md:text-5xl font-black leading-tight">
                  AI 빌딩 데이
                  <br />
                  <span className="text-brand-green">
                    라이브로 무엇이든 만들어드려요
                  </span>
                </h2>
              </div>

              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl">
                하루 동안 · 솔이 직접 라이브로
                <br />
                여러분이 원하는 서비스를 즉석에서 만들어드려요.
                <br />
                <span className="text-white/60 text-sm">
                  · 예약 시스템 · 고객 DB · 자동화 알림 · 결제 연동 · 무엇이든
                </span>
              </p>

              {/* 잔여석 바 */}
              {filled !== null && (
                <div className="space-y-1.5 pt-2 max-w-md">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">
                      {isFull ? (
                        "선착순 마감"
                      ) : (
                        <>
                          잔여{" "}
                          <span className="font-bold text-brand-green">
                            {remaining}
                          </span>
                          석 / {EVENT_SEATS}석
                        </>
                      )}
                    </span>
                    <span className="text-white/50">
                      {filled}명 신청 완료
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-green to-brand-green/70 transition-all"
                      style={{
                        width: `${Math.min(100, (filled / EVENT_SEATS) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full h-12 px-8 bg-brand-green text-white hover:bg-brand-green/90 font-semibold"
                  disabled={isFull}
                >
                  <Link href="/live#apply">
                    {isFull ? "마감되었습니다" : "🎯 지금 신청하기"}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 bg-transparent border-white/30 text-white hover:bg-white/10"
                >
                  <Link href="/live">자세히 보기</Link>
                </Button>
              </div>
            </div>

            {/* 우측 시각 포인트 */}
            <div className="hidden md:flex flex-col items-center justify-center min-w-[180px]">
              <div className="text-7xl font-black text-brand-green">
                05<span className="text-white/30">/</span>24
              </div>
              <div className="text-xs text-white/60 tracking-widest mt-2">
                AI BUILDING DAY
              </div>
              <div className="mt-6 text-xs text-white/70 text-center space-y-1">
                <p>⏰ 10:00 ~ 18:00</p>
                <p>💻 줌 라이브 · 무료</p>
                <p>🎁 30일 카톡 질문 지원</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
