import Link from "next/link";
import { Nav } from "@/components/shared/nav";
import { Button } from "@/components/ui/button";
import { KakaoChatBtn } from "@/components/shared/kakao-chat-btn";
import { Footer } from "@/components/landing/footer";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "대기자 등록 완료",
  description: "달팽이멤버십 대기자로 등록되었어요",
};

// 스쿨/기본/프리미엄 대기자 공통 완료 페이지
export default function AppliedPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-24 pb-20 flex items-center">
        <div className="container-narrow max-w-xl text-center space-y-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-brand-green/15 flex items-center justify-center text-4xl">
            🎉
          </div>

          <div className="space-y-3">
            <h1 className="headline-md">대기자 등록 완료!</h1>
            <p className="text-muted-foreground leading-relaxed">
              수요가 차면 가장 먼저 안내드릴게요.
              <br />
              확인 문자도 보내드렸어요.
            </p>
          </div>

          <div className="rounded-2xl bg-brand-paper border border-brand-line p-6 space-y-2.5 text-left">
            <p className="text-sm font-semibold">📌 다음 단계</p>
            <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
              <li>• 오픈 공지가 카톡/문자로 발송됩니다</li>
              <li>• 대기자 우선 24시간 접수 기간 제공</li>
              <li>• 먼저 빌더 기초(30만)에서 체험해보셔도 좋아요</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild size="lg" className="rounded-full h-12">
              <Link href="/apply">🐌 먼저 빌더 기초 해보기</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full h-11"
            >
              <a
                href={`https://pf.kakao.com/_${SITE.kakaoChannel}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 카톡 sool9241 바로가기
              </a>
            </Button>
            <Button asChild variant="ghost" className="rounded-full h-10">
              <Link href="/">메인으로 돌아가기</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <KakaoChatBtn />
    </>
  );
}
