import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const members = [
  { name: "솔", role: "펜션·공방 운영", tag: "7년 자동화 덕후" },
  { name: "지민", role: "프리랜서 디자이너", tag: "혼자 일하다 동료가 필요했어요" },
  { name: "현우", role: "카페 사장", tag: "예약 시스템 직접 만듦" },
  { name: "수아", role: "온라인 강사", tag: "수강생 관리 자동화 완성" },
  { name: "태호", role: "스마트스토어", tag: "상세페이지 직접 제작" },
  { name: "은비", role: "N잡러", tag: "부업 3개 자동화 중" },
];

// 빌더온리 스타일 멤버 프로필 — 가장 중요한 섹션
export function Members() {
  return (
    <section className="section-padding">
      <div className="container-normal">
        <div className="text-center mb-16 space-y-3">
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            함께하는 동료들
          </p>
          <h2 className="headline-md">이런 분들과 함께합니다</h2>
          <p className="text-muted-foreground max-w-xl mx-auto pt-2 leading-relaxed">
            1인 사업자 · 프리랜서 · 강사 · 카페 사장 · N잡러 · 예비창업자
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {members.map((m) => (
            <Card key={m.name} className="border-0 bg-white p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-brand-green/10 flex items-center justify-center text-3xl">
                {m.name === "솔" ? "🐌" : "👤"}
              </div>
              <h3 className="font-semibold">{m.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
              <Badge
                variant="secondary"
                className="mt-3 bg-brand-green/10 text-brand-green-dark border-0 text-[11px]"
              >
                {m.tag}
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
