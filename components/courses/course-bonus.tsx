import { Badge } from "@/components/ui/badge";

type Props = {
  kind: "pension" | "yearly" | "lifetime";
};

// 3단 코스 보상 섹션 - 멤버십 서사는 추후 재활성, 지금은 "특별 혜택" 톤
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
  const title = isLifetime ? "프리미엄 100인 한정" : "기본 100인 한정";
  const emoji = isLifetime ? "🌟" : "💎";
  const benefits = isLifetime
    ? [
        "솔 1:1 연 2회 전략 상담 평생 제공",
        "이후 열리는 모든 빌더 프로그램 우선 초대",
        "신규 프로그램 베타 우선 참여",
        "달팽이 OS SaaS 얼리 액세스",
        "프리미엄 졸업자 전용 네트워크",
      ]
    : [
        "이후 열리는 빌더 프로그램 우선 초대",
        "솔 피드백 세션 우선 참여권",
        "기본 졸업자 전용 커뮤니티",
        "매주 줌 라이브 우선 공지",
      ];

  return (
    <section className="section-padding-sm">
      <div className="container-narrow">
        <div className="rounded-3xl bg-gradient-to-br from-brand-green/10 via-brand-green/5 to-transparent border-2 border-brand-green/30 p-8 md:p-12 text-center space-y-6">
          <Badge className="bg-brand-green-dark text-white border-0 tracking-widest">
            ⭐ 수강자 전용 특별 혜택
          </Badge>
          <div>
            <p className="text-4xl md:text-5xl mb-3">{emoji}</p>
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
              {title}
              <br />
              <span className="text-brand-green-dark">특별 혜택</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            수강 확정 후 자동 부여 · 선착순 100명만
          </p>

          <ul className="text-left max-w-md mx-auto space-y-2 pt-2">
            {benefits.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="text-brand-green-dark">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
