"use client";

import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "./waitlist-form";
import { WaitlistCounter } from "./waitlist-counter";
import { WAITLIST_TARGET_LABEL } from "@/lib/constants";

type Target = "course_standard" | "course_premium";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  targetType: Target;
};

// v6 SOLD OUT 모달 - "100인 한정" FOMO + 대기자 폼
export function WaitlistModal({ open, onOpenChange, targetType }: Props) {
  const [done, setDone] = useState<{ position: number } | null>(null);
  const label = WAITLIST_TARGET_LABEL[targetType];
  const perkLabel =
    targetType === "course_premium"
      ? "프리미엄 100인 한정 혜택"
      : targetType === "course_standard"
      ? "기본 100인 한정 혜택"
      : "오픈 우선 안내";

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setDone(null); }}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-3">
          <div className="inline-flex mx-auto">
            <Badge className="bg-red-500 text-white border-0 tracking-widest">
              SOLD OUT
            </Badge>
          </div>
          <DialogTitle className="text-xl text-center leading-snug">
            ✨ 특별 멤버십 회원
            <br />
            100인만 수강할 수 있습니다
          </DialogTitle>
          <DialogDescription className="text-center">
            {label} · {perkLabel}
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="py-10 text-center space-y-4">
            <div className="text-4xl">🎉</div>
            <p className="text-lg font-semibold">
              대기자 <span className="text-brand-green-dark">{done.position}번째</span> 등록 완료!
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              수요가 차면 가장 먼저 안내드릴게요.
              <br />
              그 전에 빌더 기초(30만)도 한 번 경험해보세요.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild className="rounded-full w-full">
                <Link href="/apply">먼저 빌더 기초 해보기</Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="rounded-full w-full"
              >
                닫기
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="rounded-xl bg-brand-green/5 border border-brand-green/20 p-4 space-y-2">
              <p className="text-xs text-muted-foreground">이 프로그램의 특별 혜택</p>
              <p className="text-base font-bold text-brand-green-dark">
                🎁 100인 한정 · 수강자 전용 특별 혜택
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                수요가 차면 오픈 공지드릴게요. 아래 폼으로 먼저 등록해 주세요.
              </p>
              <WaitlistCounter targetType={targetType} className="mt-2" />
            </div>

            <WaitlistForm
              targetType={targetType}
              onSuccess={(info) => setDone(info)}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
