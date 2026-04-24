"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || "로그인 실패");
        return;
      }
      toast.success("관리자 로그인 완료");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("서버 오류");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-sm border-0 bg-white p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-4xl">🔐</div>
          <h1 className="text-xl font-bold">관리자 로그인</h1>
          <p className="text-xs text-muted-foreground">달팽이멤버십 Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pw">비밀번호</Label>
            <Input
              id="pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full"
            disabled={submitting}
          >
            {submitting ? "확인 중..." : "로그인"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
