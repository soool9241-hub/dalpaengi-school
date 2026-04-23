import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// 스쿨 티저 — "대기자 등록" 유도
export function SchoolTeaser() {
  return (
    <section className="section-padding">
      <div className="container-narrow text-center space-y-8">
        <Badge variant="secondary" className="border-0">
          COMING SOON
        </Badge>
        <h2 className="headline-md">
          1년간 12개의 서비스를
          <br />
          함께 만드는 멤버십
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          달팽이스쿨은 빌더코스 수료자를 우선 초대하는 1년 멤버십이에요.
          <br />
          빌더 기본 · 프리미엄 수강자에게는 멤버십 자격이 자동 부여돼요.
        </p>
        <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-12">
          <Link href="/school">대기자 등록하기</Link>
        </Button>
      </div>
    </section>
  );
}
