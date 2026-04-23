import Link from "next/link";
import { Button } from "@/components/ui/button";

// 매주 토 무료 라이브 티저 — 리드 마그넷
export function LiveTeaser() {
  return (
    <section className="section-padding bg-brand-paper">
      <div className="container-narrow text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-muted-foreground">매주 토요일 저녁 8시</span>
        </div>
        <h2 className="headline-md">무료 라이브에서 먼저 만나요</h2>
        <p className="text-muted-foreground leading-relaxed">
          한 시간, 실제 자동화 사례를 같이 뜯어봅니다.
          <br />
          인스타 라이브 · 녹화본 제공 · 무료
        </p>
        <Button asChild size="lg" className="rounded-full px-8 h-12">
          <Link href="/live">이번 주 라이브 신청</Link>
        </Button>
      </div>
    </section>
  );
}
