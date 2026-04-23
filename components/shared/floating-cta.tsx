"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 스크롤 300px 이상 시 하단 고정 CTA 노출
export function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-4 inset-x-0 z-30 px-4 transition-all duration-300 md:bottom-6",
        show
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none"
      )}
    >
      <div className="max-w-md mx-auto">
        <Button
          asChild
          size="lg"
          className="w-full rounded-full shadow-lg bg-foreground text-background hover:bg-foreground/90"
        >
          <Link href="/apply">🐌 빌더 기초 신청하기</Link>
        </Button>
      </div>
    </div>
  );
}
