"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  targetType: "course_standard" | "course_premium" | "school";
  className?: string;
};

// 실시간 대기자 수 카운터 - Supabase count 호출
export function WaitlistCounter({ targetType, className }: Props) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/waitlist?target_type=${targetType}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setCount(j.count ?? 0))
      .catch(() => setCount(0));
  }, [targetType]);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      <span className="text-xs font-semibold text-red-700">
        현재 대기자 {count ?? "…"}명
      </span>
    </div>
  );
}
