import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  category: "course" | "school" | "hackathon";
  description?: string;
  caseDate?: string;
  participants?: string;
  duration?: string;
  highlights?: string[];
  testimonial?: string;
  testimonialName?: string;
};

const CATEGORY_LABEL = {
  course: "빌더코스",
  school: "달팽이멤버십",
  hackathon: "해커톤",
} as const;

const CATEGORY_COLOR = {
  course: "bg-brand-green/10 text-brand-green-dark",
  school: "bg-amber-100 text-amber-800",
  hackathon: "bg-blue-100 text-blue-800",
} as const;

export function CaseCard({
  title,
  category,
  description,
  caseDate,
  participants,
  duration,
  highlights,
  testimonial,
  testimonialName,
}: Props) {
  return (
    <Card className="border-0 bg-white p-7 space-y-4 flex flex-col">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Badge className={cn("border-0", CATEGORY_COLOR[category])}>
          {CATEGORY_LABEL[category]}
        </Badge>
        {caseDate && <span className="text-xs text-muted-foreground">{caseDate}</span>}
      </div>

      <h3 className="text-lg font-bold leading-snug">{title}</h3>

      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}

      {(participants || duration) && (
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground border-t border-brand-line pt-3">
          {participants && <span>👥 {participants}</span>}
          {duration && <span>⏱ {duration}</span>}
        </div>
      )}

      {highlights && highlights.length > 0 && (
        <ul className="space-y-1.5 text-sm">
          {highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-brand-green-dark">✓</span>
              <span className="text-foreground/80">{h}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex-1" />

      {testimonial && (
        <div className="border-t border-brand-line pt-4 italic text-sm text-muted-foreground">
          &ldquo;{testimonial}&rdquo;
          {testimonialName && (
            <p className="not-italic mt-2 text-xs text-foreground/70">
              — {testimonialName}
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
