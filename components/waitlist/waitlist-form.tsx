"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WAITLIST_TARGET_LABEL } from "@/lib/constants";

type TargetType = keyof typeof WAITLIST_TARGET_LABEL;

type Props = {
  targetType: TargetType;
  onSuccess?: (info: { position: number }) => void;
  // 스쿨 폼은 "빌더코스 수강 여부" 체크박스 추가
  showSchoolExtras?: boolean;
};

// v6 통합 대기자 폼 - target_type 3종 공통
export function WaitlistForm({ targetType, onSuccess, showSchoolExtras = false }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentWork, setCurrentWork] = useState("");
  const [whyInterested, setWhyInterested] = useState("");
  const [expectedService, setExpectedService] = useState("");
  const [hasTakenBasic, setHasTakenBasic] = useState(false);
  const [hasTakenStandard, setHasTakenStandard] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
      const params = new URLSearchParams(window.location.search);
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_type: targetType,
          name: name.trim(),
          phone: phoneDigits,
          email: email.trim() || undefined,
          current_work: currentWork.trim() || undefined,
          why_interested: whyInterested.trim() || undefined,
          expected_service: expectedService.trim() || undefined,
          has_taken_basic: showSchoolExtras ? hasTakenBasic : undefined,
          has_taken_standard: showSchoolExtras ? hasTakenStandard : undefined,
          utm_source: params.get("utm_source") || undefined,
          utm_medium: params.get("utm_medium") || undefined,
          utm_campaign: params.get("utm_campaign") || undefined,
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error || "등록 실패. 다시 시도해주세요.");
        return;
      }

      if (typeof window !== "undefined" && "gtag" in window) {
        // @ts-expect-error gtag injected at runtime
        window.gtag?.("event", "waitlist_submit", {
          target_type: targetType,
          position: json.position,
        });
      }

      toast.success(`${WAITLIST_TARGET_LABEL[targetType]} 대기자 ${json.position}번째 등록 완료!`);
      onSuccess?.({ position: json.position });

      // 초기화
      setName(""); setPhone(""); setEmail("");
      setCurrentWork(""); setWhyInterested(""); setExpectedService("");
      setHasTakenBasic(false); setHasTakenStandard(false);
    } catch (err) {
      console.error(err);
      toast.error("서버 오류가 발생했습니다");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="wl-name">이름 *</Label>
        <Input
          id="wl-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="홍길동"
          maxLength={50}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="wl-phone">휴대폰 번호 *</Label>
        <Input
          id="wl-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          placeholder="010-0000-0000"
          maxLength={13}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="wl-email">이메일 (선택)</Label>
        <Input
          id="wl-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="wl-work">현재 어떤 일을 하고 계세요? (선택)</Label>
        <Textarea
          id="wl-work"
          value={currentWork}
          onChange={(e) => setCurrentWork(e.target.value)}
          placeholder="예: 카페 사장, 프리랜서 디자이너..."
          maxLength={500}
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="wl-service">만들고 싶은 서비스가 있다면? (선택)</Label>
        <Textarea
          id="wl-service"
          value={expectedService}
          onChange={(e) => setExpectedService(e.target.value)}
          placeholder="예: 고객 예약 시스템, 수강생 관리 대시보드..."
          maxLength={500}
          rows={2}
        />
      </div>

      {showSchoolExtras && (
        <div className="space-y-2 pt-2 border-t border-brand-line">
          <Label>빌더코스 수강 경험 (선택)</Label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={hasTakenBasic}
                onChange={(e) => setHasTakenBasic(e.target.checked)}
                className="w-4 h-4 accent-brand-green"
              />
              빌더 기초 수강 경험 있음
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={hasTakenStandard}
                onChange={(e) => setHasTakenStandard(e.target.checked)}
                className="w-4 h-4 accent-brand-green"
              />
              빌더 기본 수강 경험 있음
            </label>
          </div>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full h-12 text-base font-semibold"
        disabled={submitting}
      >
        {submitting ? "등록 중..." : "🐌 대기자 등록하기"}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        수요가 차면 가장 먼저 안내드려요. 이 번호는 중복 등록이 안 돼요.
      </p>
    </form>
  );
}
