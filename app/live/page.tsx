import { Nav } from "@/components/shared/nav";
import { KakaoChatBtn } from "@/components/shared/kakao-chat-btn";
import { FloatingCTA } from "@/components/shared/floating-cta";
import { Footer } from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LiveRegisterForm } from "@/components/live/live-register-form";

export const metadata = {
  title: "매주 토 무료 줌 라이브",
  description:
    "자동화 시스템 시연 줌 라이브 · 매주 토요일 저녁 8시 · 실제 운영 시스템의 구조를 화면 공유로 공개",
};

// 다음 토요일 날짜 (YYYY-MM-DD)
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
  const nextDate = getNextSaturday();
  const topic = "달팽이아지트 예약 자동화 · 전체 구조 해부";

  return (
    <>
      <Nav />
      <main className="flex-1 pt-28 pb-20">
        {/* 히어로 */}
        <section className="section-padding-sm">
          <div className="container-narrow text-center space-y-5">
            <div className="inline-flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-muted-foreground">매주 토요일 저녁 8시 · 줌 라이브</span>
            </div>
            <h1 className="headline-lg">
              자동화 시스템, 어떻게 돌아가는지
              <br />
              직접 보여드려요
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              솔이 직접 운영 중인 시스템을 실시간 화면 공유로 공개해요.
              <br />
              펜션 · 공방 · AI 자동화까지 · 한 시간에 구조가 보여요.
              <br />
              줌 참여 · 녹화본 제공 · 무료
            </p>
          </div>
        </section>

        {/* 이번 주 주제 */}
        <section className="section-padding-sm">
          <div className="container-narrow max-w-2xl">
            <Card className="border-0 bg-white p-8 space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <Badge className="bg-brand-green text-white border-0">이번 주</Badge>
                <span className="text-sm font-semibold">
                  📅 {nextDate} (토) 20:00 · Zoom
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{topic}</h2>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <li>· 7년 운영 중인 펜션의 실제 자동화 플로우 공개</li>
                  <li>· Supabase 스키마 · Solapi 시퀀스 · 웹훅 구조 해부</li>
                  <li>· 화면 공유 시연 + 실시간 Q&A</li>
                </ul>
              </div>
              <div className="border-t border-brand-line pt-5">
                <LiveRegisterForm liveDate={nextDate} liveTopic={topic} />
              </div>
            </Card>
          </div>
        </section>

        {/* 지난 아카이브 */}
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
      <FloatingCTA />
      <KakaoChatBtn />
    </>
  );
}
