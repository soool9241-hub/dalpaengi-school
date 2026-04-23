import { Card } from "@/components/ui/card";
import { TRACKS } from "@/lib/constants";

// 3트랙 — 빌더/세일즈/쉐어
export function ThreeTracks() {
  return (
    <section className="section-padding">
      <div className="container-normal space-y-12">
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            달팽이스쿨 3트랙
          </p>
          <h2 className="headline-md">
            우리가 1년간 함께 훈련하는
            <br />
            세 가지 근육
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TRACKS.map((t) => (
            <Card key={t.name} className="border-0 bg-white p-8 text-center">
              <div className="text-4xl mb-4">{t.emoji}</div>
              <h3 className={`text-xl font-semibold mb-3 ${t.color}`}>
                {t.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{t.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
