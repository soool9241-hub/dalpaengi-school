import { Card } from "@/components/ui/card";
import { CONTENT_AXES } from "@/lib/constants";

// 3축 콘텐츠 — 60평 펜션 / 120평 공방 / AI 자동화
export function ThreeContents() {
  return (
    <section className="section-padding bg-white">
      <div className="container-normal">
        <div className="text-center mb-16 space-y-3">
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            솔이 다루는 3가지 축
          </p>
          <h2 className="headline-md">
            책으로 배운 게 아니에요.
            <br />
            지금도 제가 운영 중인 것들이에요.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {CONTENT_AXES.map((a) => (
            <Card key={a.name} className="border-0 bg-brand-paper p-8 space-y-4">
              <div className="text-4xl">{a.emoji}</div>
              <div>
                <h3 className="text-lg font-bold">{a.name}</h3>
                <p className="text-xs text-brand-green-dark mt-1">{a.sub}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {a.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
