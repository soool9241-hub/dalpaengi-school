"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COURSES } from "@/lib/constants";

// v6 P1: 기초만 실 신청 가능 · 기본/프리미엄은 /courses 상세의 대기자 모달로 유도
export function ApplyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // ?course=basic만 유효 · 그 외는 기초로 귀결
  const requested = searchParams.get("course");
  const isInvalidRequest = requested === "standard" || requested === "premium";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentWork, setCurrentWork] = useState("");
  const [expectation, setExpectation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isInvalidRequest) {
      toast.info("빌더 기본·프리미엄은 SOLD OUT 상태예요. 대기자 등록 페이지로 이동할게요.", {
        duration: 4000,
      });
      const nextPath = requested === "premium" ? "/courses/premium" : "/courses/standard";
      const t = setTimeout(() => router.replace(nextPath), 1200);
      return () => clearTimeout(t);
    }
  }, [isInvalidRequest, requested, router]);

  const formatPhone = (raw: string) => {
    const d = raw.replace(/[^0-9]/g, "").slice(0, 11);
    if (d.length > 7) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
    if (d.length > 3) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return d;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (!name.trim() || name.trim().length < 2) {
      toast.error("이름을 2자 이상 입력해주세요");
      return;
    }
    const phoneDigits = phone.replace(/[^0-9]/g, "");
    if (!/^01[0-9]{8,9}$/.test(phoneDigits)) {
      toast.error("올바른 휴대폰 번호를 입력해주세요");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        phone: phoneDigits,
        email: email.trim() || undefined,
        course_type: "basic" as const,
        current_work: currentWork.trim() || undefined,
        expectation: expectation.trim() || undefined,
        utm_source: searchParams.get("utm_source") || undefined,
        utm_medium: searchParams.get("utm_medium") || undefined,
        utm_campaign: searchParams.get("utm_campaign") || undefined,
      };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error || "신청 실패. 다시 시도해주세요.");
        return;
      }

      if (typeof window !== "undefined" && "gtag" in window) {
        // @ts-expect-error gtag injected at runtime
        window.gtag?.("event", "apply_submit", {
          course_type: "basic",
          price: json.price,
        });
      }

      router.push(`/success?course=basic&price=${json.price}`);
    } catch (err) {
      console.error(err);
      toast.error("서버 오류가 발생했습니다");
    } finally {
      setSubmitting(false);
    }
  }

  if (isInvalidRequest) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-lg">🔒 해당 코스는 SOLD OUT 상태예요</p>
        <p className="text-sm text-muted-foreground">
          대기자 등록 페이지로 이동 중...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 기초 신청임을 명확히 (v6: 기초만 상시 신청) */}
      <div className="rounded-xl bg-brand-green/5 border border-brand-green/20 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐌</span>
          <p className="font-semibold text-brand-green-dark">
            빌더 기초 (3시간 · 체험형)
          </p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          AI로 웹 서비스 하나를 직접 만들고 Vercel에 배포하는 체험 · 60평
          펜션 10만원 할인권 보너스
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">이름 *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="홍길동"
          maxLength={50}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">휴대폰 번호 *</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          placeholder="010-0000-0000"
          maxLength={13}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">이메일 (선택)</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="current_work">현재 어떤 일을 하고 계세요? (선택)</Label>
        <Textarea
          id="current_work"
          value={currentWork}
          onChange={(e) => setCurrentWork(e.target.value)}
          placeholder="예: 카페 사장, 프리랜서 디자이너, 예비 창업자..."
          maxLength={500}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="expectation">이 코스에서 기대하는 것은? (선택)</Label>
        <Textarea
          id="expectation"
          value={expectation}
          onChange={(e) => setExpectation(e.target.value)}
          placeholder="예: 예약 시스템을 만들고 싶어요, AI로 무언가 만들고 싶어요..."
          maxLength={500}
          rows={3}
        />
      </div>

      <div className="pt-2 space-y-3">
        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
          <span className="text-sm text-muted-foreground">수강료 (얼리버드)</span>
          <span className="text-2xl font-bold text-brand-green-dark">
            {COURSES.basic.earlybirdPrice.toLocaleString()}원
          </span>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-full h-14 text-base font-semibold"
          disabled={submitting}
        >
          {submitting ? "신청 중..." : "🐌 신청하기"}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          신청 후 결제 링크를 카톡(sool9241)으로 보내드려요
        </p>
      </div>
    </form>
  );
}
