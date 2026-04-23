import { Card } from "@/components/ui/card";

const voices = [
  {
    quote:
      "3시간 만에 제 이름으로 된 웹사이트가 생겼어요. 다음 날 고객이 거기서 예약을 남겼어요.",
    name: "지민",
    role: "프리랜서 디자이너",
  },
  {
    quote:
      "카페 예약 시스템 외주 견적 300만원이 나왔는데, 그보다 더 내 마음에 드는 걸 직접 만들었어요.",
    name: "현우",
    role: "카페 사장",
  },
  {
    quote:
      "이게 혼자 했으면 1년 걸릴 일이었어요. 커뮤니티에서 같이 하니까 한 달이에요.",
    name: "수아",
    role: "온라인 강사",
  },
];

// 멤버 후기 — 가벼운 카드 그리드 (캐러셀 없이)
export function Voices() {
  return (
    <section className="section-padding bg-white">
      <div className="container-normal">
        <div className="text-center mb-12 space-y-3">
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            먼저 다녀간 분들의 이야기
          </p>
          <h2 className="headline-md">이미 만들고 있는 동료들</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {voices.map((v, i) => (
            <Card key={i} className="border-0 bg-brand-paper p-8 flex flex-col">
              <p className="text-base leading-relaxed mb-6">
                &ldquo;{v.quote}&rdquo;
              </p>
              <div className="flex-1" />
              <div className="border-t border-brand-line pt-4">
                <p className="font-semibold text-sm">{v.name}</p>
                <p className="text-xs text-muted-foreground">{v.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
