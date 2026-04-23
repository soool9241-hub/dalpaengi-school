import { Badge } from "@/components/ui/badge";

type Props = {
  badge: string;
  badgeColor?: "green" | "red" | "amber";
  title: string;
  subtitle: string;
  tagline?: string;
};

// 코스 상세 페이지 히어로 - 상태 뱃지 + 제목 + 서브
export function CourseDetailHero({ badge, badgeColor = "green", title, subtitle, tagline }: Props) {
  const colorCls =
    badgeColor === "red"
      ? "bg-red-500 text-white"
      : badgeColor === "amber"
      ? "bg-amber-500 text-white"
      : "bg-brand-green text-white";

  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-20">
      <div className="container-narrow text-center space-y-6">
        <Badge className={`${colorCls} border-0 tracking-wider`}>{badge}</Badge>
        <h1 className="headline-lg">{title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
        {tagline && (
          <p className="text-sm text-brand-green-dark pt-2 font-medium">
            {tagline}
          </p>
        )}
      </div>
    </section>
  );
}
