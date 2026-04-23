import Link from "next/link";
import { Button } from "@/components/ui/button";

// 히어로 - 카피 #1 + 1기 런칭 · 가격 강조 X
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-paper via-brand-paper to-white/60 pointer-events-none" />
      <div
        aria-hidden
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-green/10 blur-3xl pointer-events-none"
      />

      <div className="relative container-narrow text-center space-y-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green-dark text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
          빌더코스 1기 · 첫 런칭 · 오직 1개
        </div>

        <h1 className="headline-xl">
          누구나 할 순 있지만,
          <br />
          <span className="text-brand-green">아무나 할 순 없습니다.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          1년간 12개의 서비스를 함께 만드는 멤버십.
          <br />
          먼저 빌더코스에서 한 번 만나봐요.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild size="lg" className="rounded-full px-8 h-12">
            <Link href="/apply">빌더코스 신청하기</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-8 h-12"
          >
            <Link href="/live">매주 토 무료 라이브</Link>
          </Button>
        </div>

        <div className="pt-8 text-xs text-muted-foreground">
          🐌 느리더라도 멈추지 않으면 도착해요
        </div>
      </div>
    </section>
  );
}
