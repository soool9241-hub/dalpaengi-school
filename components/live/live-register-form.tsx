"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  liveDate: string; // YYYY-MM-DD
  liveTopic?: string;
};

// 매주 토 무료 라이브 신청 폼
export function LiveRegisterForm({ liveDate, liveTopic }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const formatPhone = (raw: string) => {
    const d = raw.replace(/[^0-9]/g, "").slice(0, 11);
    if (d.length > 7) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
    if (d.length > 3) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return d;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const phoneDigits = phone.replace(/[^0-9]/g, "");
    if (!name.trim() || name.trim().length < 2) {
      toast.error("이름을 2자 이상 입력해주세요");
      return;
    }
    if (!/^01[0-9]{8,9}$/.test(phoneDigits)) {
      toast.error("올바른 휴대폰 번호를 입력해주세요");
      return;
    }

    setSubmitting(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch("/api/live/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phoneDigits,
          email: email.trim() || undefined,
          live_date: liveDate,
          live_topic: liveTopic,
          utm_source: params.get("utm_source") || undefined,
          utm_campaign: params.get("utm_campaign") || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || "신청 실패. 다시 시도해주세요.");
        return;
      }
      toast.success("라이브 신청 완료! 확인 문자를 보내드렸어요.");
      setDone(true);
      setName(""); setPhone(""); setEmail("");
    } catch (err) {
      console.error(err);
      toast.error("서버 오류가 발생했습니다");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl bg-brand-green/5 border border-brand-green/20 p-6 text-center space-y-3">
        <div className="text-3xl">🎉</div>
        <p className="font-semibold">신청 완료!</p>
        <p className="text-sm text-muted-foreground">
          📅 {liveDate} 20:00 · Zoom
          <br />
          당일 오후 카톡(sool9241)으로 줌 링크 발송
        </p>
        <Button
          variant="outline"
          onClick={() => setDone(false)}
          className="rounded-full mt-2"
          size="sm"
        >
          한 명 더 신청
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="lv-name">이름 *</Label>
        <Input
          id="lv-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="홍길동"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lv-phone">휴대폰 번호 *</Label>
        <Input
          id="lv-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          placeholder="010-0000-0000"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lv-email">이메일 (선택)</Label>
        <Input
          id="lv-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full h-12"
        disabled={submitting}
      >
        {submitting ? "신청 중..." : "🐌 라이브 신청하기"}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        줌 링크는 당일 오후 카톡으로 발송 · 무료
      </p>
    </form>
  );
}
