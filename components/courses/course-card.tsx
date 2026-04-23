"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CourseId } from "@/lib/constants";

type Props = {
  variant: CourseId; // basic | standard | premium
  title: string;
  tagline: string;
  duration: string;
  regularPrice: number;
  earlybirdPrice?: number | null;
  bonus?: string;
  status: "open" | "soldout";
  href: string; // 코스 상세 URL
  applyHref?: string; // 기초 신청 URL (open만)
  onSoldoutClick?: () => void; // SOLD OUT 모달 트리거
  isBest?: boolean;
};

// v6 3단 공통 카드 - status에 따라 "신청" 또는 "SOLD OUT · 대기자" 버튼 렌더
export function CourseCard({
  variant,
  title,
  tagline,
  duration,
  regularPrice,
  earlybirdPrice,
  bonus,
  status,
  href,
  applyHref,
  onSoldoutClick,
  isBest = false,
}: Props) {
  const isSoldOut = status === "soldout";
  const displayPrice = earlybirdPrice ?? regularPrice;
  const priceLabel = Math.floor(regularPrice / 10000);

  const tierBadge =
    variant === "basic"
      ? { label: "체험형", cls: "bg-muted text-foreground/70" }
      : variant === "standard"
      ? { label: "활용형", cls: "bg-brand-green/10 text-brand-green-dark" }
      : { label: "프리미엄", cls: "bg-amber-100 text-amber-800" };

  return (
    <Card
      className={cn(
        "relative border-0 bg-white p-8 space-y-5 flex flex-col transition-all",
        isBest && "ring-2 ring-brand-green",
        isSoldOut && "opacity-95"
      )}
    >
      {isBest && (
        <Badge className="absolute -top-3 right-6 bg-brand-green text-white border-0">
          BEST
        </Badge>
      )}
      {isSoldOut && (
        <Badge className="absolute -top-3 left-6 bg-red-500 text-white border-0 tracking-wider">
          SOLD OUT
        </Badge>
      )}

      <Badge variant="secondary" className={cn("w-fit border-0", tierBadge.cls)}>
        {tierBadge.label}
      </Badge>

      <div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {duration} · {tagline}
        </p>
      </div>

      <div className="flex items-baseline gap-2">
        {earlybirdPrice && earlybirdPrice < regularPrice && (
          <span className="text-sm line-through text-muted-foreground">
            {Math.floor(regularPrice / 10000)}만
          </span>
        )}
        <span className="text-3xl font-bold text-brand-green-dark">
          {Math.floor(displayPrice / 10000)}만
        </span>
        <span className="text-muted-foreground">원</span>
        {earlybirdPrice && earlybirdPrice < regularPrice && (
          <Badge className="ml-2 bg-red-100 text-red-700 border-0">얼리버드</Badge>
        )}
      </div>

      {bonus && (
        <div className="rounded-lg bg-brand-green/5 border border-brand-green/20 px-3 py-2.5">
          <p className="text-xs text-brand-green-dark font-semibold">🎁 {bonus}</p>
        </div>
      )}

      <div className="flex-1" />

      <div className="flex flex-col gap-2 pt-2">
        {isSoldOut ? (
          <Button
            onClick={onSoldoutClick}
            className="rounded-full w-full h-11 bg-foreground text-background hover:bg-foreground/90"
          >
            🔒 SOLD OUT · 대기자 등록하기
          </Button>
        ) : (
          <Button asChild className="rounded-full w-full h-11">
            <Link href={applyHref || href}>
              {priceLabel}만원 · 신청하기
            </Link>
          </Button>
        )}
        <Button
          asChild
          variant="outline"
          className="rounded-full w-full h-10 border-0 text-muted-foreground hover:text-foreground"
        >
          <Link href={href}>자세히 보기 →</Link>
        </Button>
      </div>
    </Card>
  );
}
