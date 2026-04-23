import { Nav } from "@/components/shared/nav";
import { KakaoChatBtn } from "@/components/shared/kakao-chat-btn";
import { FloatingCTA } from "@/components/shared/floating-cta";
import { Footer } from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LiveRegisterForm } from "@/components/live/live-register-form";

export const metadata = {
  title: "매주 토 무료 라이브",
  description: "매주 토요일 저녁 8시, 1시간 무료 라이브 · 실제 자동화 사례를 같이 뜯어봅니다",
};

// 다음 토요일 날짜 계산 (YYYY-MM-DD)
function getNextSaturday(): string {
  const today = new Date();
  const day = today.getDay();
  const diff = (6 - day + 7) % 7 || 7;
  const sat = new Date(today);
  sat.setDate(today.getDate() + diff);
  return sat.toISOString().split("T")[0];
}

const archive = [
  { date: "2026-04-19", title: "Claude Code로 랜딩페이지 30분 만에", channel: "YouTube" },
  { date: "2026-04-12", title: "Supabase로 예약 시스템 만들기", channel: "YouTube" },
  { date: "2026-04-05", title: "Solapi + n8n 알림 자동화", channel: "YouTube" },
];

export default function LivePage() {
  const nextDate = getNextSaturday();
  const topic = "Claude Code 첫 서비스 · 실전 데모";

  return (
    <>
      <Nav />
      <main className="flex-1 pt-28 pb-20">
        {/* 히어로 */}
        <section className="section-padding-sm">
          <div className="container-narrow text-center space-y-5">
            <div className="inline-flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-muted-foreground">매주 토요일 저녁 8시</span>
            </div>
            <h1 className="headline-lg">무료 라이브에서 먼저 만나요</h1>
            <p className="text-muted-foreground leading-relaxed">
              한 시간, 실제 자동화 사례를 같이 뜯어봅니다.
              <br />
              인스타 라이브 · 녹화본 제공 · 무료
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
                  📅 {nextDate} (토) 20:00
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{topic}</h2>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <li>· 빈 폴더에서 시작해 배포까지 · 30분</li>
                  <li>· 실제 자동화 사례 1건 뜯어보기</li>
                  <li>· Q&A · 여러분 서비스 아이디어 피드백</li>
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
                지난 라이브
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
                  <p className="text-xs text-brand-green-dark">📺 {a.channel}</p>
                </Card>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-6">
              전체 아카이브는 유튜브 &ldquo;빌더 솔&rdquo; 채널에서 · 준비 중
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
