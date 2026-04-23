import { Badge } from "@/components/ui/badge";

type Props = {
  kind: "pension" | "yearly" | "lifetime";
};

// v6 멤버십 자격 보상 강조 섹션
// 기초 = 펜션 할인권 · 기본 = 1년 멤버십 · 프리미엄 = 평생 멤버십
export function CourseBonus({ kind }: Props) {
  if (kind === "pension") {
    return (
      <section className="section-padding-sm">
        <div className="container-narrow">
          <div className="rounded-3xl bg-brand-green/5 border border-brand-green/20 p-8 md:p-12 text-center space-y-4">
            <Badge className="bg-brand-green text-white border-0">🎁 기초 수료자 보너스</Badge>
            <h2 className="text-2xl md:text-3xl font-bold">
              달팽이아지트 60평 펜션
              <br />
              10만원 할인권
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              체크인 시 사용 · 유효기간 1년
              <br />
              솔이 직접 운영하는 7년차 펜션에서 쉬며 아이디어를 정리해보세요.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const isLifetime = kind === "lifetime";
  const label = isLifetime ? "평생" : "1년";
  const emoji = isLifetime ? "🌟" : "💎";
  const benefits = isLifetime
    ? [
        "1년 멤버십 전체 혜택",
        "이후 모든 기수 재참여 무료",
        "솔 1:1 연 2회 전략 상담",
        "신규 프로그램 베타 우선 초대",
        "달팽이 OS SaaS 얼리 액세스",
        "영구 재참여 가능",
      ]
    : [
        "월 1회 라이브 워크샵 (12개월 12개 서비스)",
        "주간 커뮤니티 Q&A",
        "녹화본 영구 소장",
        "멤버 전용 디스코드 커뮤니티",
      ];

  return (
    <section className="section-padding-sm">
      <div className="container-narrow">
        <div className="rounded-3xl bg-gradient-to-br from-brand-green/10 via-brand-green/5 to-transparent border-2 border-brand-green/30 p-8 md:p-12 text-center space-y-6">
          <Badge className="bg-brand-green-dark text-white border-0 tracking-widest">
            ⭐ 수강자 전용 자격
          </Badge>
          <div>
            <p className="text-4xl md:text-5xl mb-3">{emoji}</p>
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
              달팽이스쿨 {label} 멤버십
              <br />
              <span className="text-brand-green-dark">자격 자동 부여</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            수강료 결제 확인 즉시 자격이 부여됩니다 · 선착순 100명 한정
          </p>

          <ul className="text-left max-w-md mx-auto space-y-2 pt-2">
            {benefits.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="text-brand-green-dark">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <p className="pt-4 text-xs text-muted-foreground italic">
            결제 완료 웹훅이 /api/membership/grant를 자동 호출하여 자격을 등록합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
