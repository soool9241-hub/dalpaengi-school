import { Card } from "@/components/ui/card";
import { DECLARATIONS } from "@/lib/constants";

// v6 시그니처 선언문 #2 · "서비스의 기준 — 빠르게/반복매출/상방 뚫림"
export function ServiceGoals() {
  const colors = [
    "text-red-600",
    "text-amber-600",
    "text-brand-green-dark",
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-normal">
        <div className="text-center mb-16 space-y-3">
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            우리가 만드는 서비스의 기준
          </p>
          <h2 className="headline-md">
            모든 서비스는
            <br />
            세 가지 조건을 통과해야 합니다
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {DECLARATIONS.serviceGoals.map((g, i) => (
            <Card key={g.num} className="border-0 bg-brand-paper p-8">
              <p className={`text-5xl font-bold mb-4 ${colors[i]}`}>{g.num}</p>
              <h3 className="text-xl font-semibold mb-3">{g.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{g.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
