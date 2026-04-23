import { Card } from "@/components/ui/card";

const proofs = [
  {
    emoji: "🏡",
    title: "60평 펜션 · 달팽이아지트",
    meta: "에어비앤비 5.0 · 7년 · 7,000+ 게스트",
    desc: "실제로 매일 예약이 들어오고, 결제가 일어나고, 후기가 쌓이는 펜션이에요.",
  },
  {
    emoji: "🔨",
    title: "120평 CNC 공방 · 스토리팜",
    meta: "CNC 제작 · 조립공간 · 체험 프로그램",
    desc: "같은 부지에서 운영 중인 공방. 제작·체험·예약 모두 자동화했어요.",
  },
  {
    emoji: "🤖",
    title: "AI 자동화 시스템",
    meta: "Claude Code · Supabase · n8n · Solapi",
    desc: "오늘도 시스템이 SMS를 보내고 고객을 DB에 쌓고 있어요. 제가 만든 것들이에요.",
  },
];

// 솔 실사업 증명 — 사진 3장 대체 텍스트 카드
export function HostProof() {
  return (
    <section className="section-padding">
      <div className="container-normal">
        <div className="text-center mb-12 space-y-3">
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            실제로 운영 중인 것들
          </p>
          <h2 className="headline-md">
            솔은 이론가가 아니에요.
            <br />
            매일 돌아가는 시스템이 증거예요.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {proofs.map((p) => (
            <Card key={p.title} className="border-0 bg-white p-8 space-y-4">
              <div className="text-5xl">{p.emoji}</div>
              <div>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="text-xs text-brand-green-dark mt-1">{p.meta}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
