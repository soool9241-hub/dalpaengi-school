import Link from "next/link";
import { Suspense } from "react";
import { Nav } from "@/components/shared/nav";
import { Button } from "@/components/ui/button";
import { KakaoChatBtn } from "@/components/shared/kakao-chat-btn";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "신청 완료",
  description: "빌더코스 신청이 완료되었어요",
};

function SuccessContent({
  searchParams,
}: {
  searchParams: { course?: string; price?: string };
}) {
  const priceNum = Number(searchParams.price || 0);

  return (
    <div className="container-narrow max-w-xl text-center space-y-8">
      <div className="w-20 h-20 mx-auto rounded-full bg-brand-green/15 flex items-center justify-center text-4xl">
        🎉
      </div>

      <div className="space-y-3">
        <h1 className="headline-md">신청 감사해요!</h1>
        <p className="text-muted-foreground leading-relaxed">
          확인 문자를 보내드렸어요.
          <br />
          카톡으로 결제 링크를 안내드릴게요.
        </p>
      </div>

      <div className="rounded-2xl bg-muted/50 p-6 space-y-3 text-left">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">신청 코스</span>
          <span className="font-semibold">빌더 기초 (3시간)</span>
        </div>
        {priceNum > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">수강료</span>
            <span className="font-semibold text-brand-green-dark">
              {priceNum.toLocaleString()}원
            </span>
          </div>
        )}
        <div className="border-t border-brand-line pt-3 space-y-1.5 text-xs text-muted-foreground">
          <p>• 결제 링크는 카톡으로 전달돼요</p>
          <p>• 결제 확인 후 수강 확정 문자를 받으세요</p>
          <p>• 수강 전날 오전에 리마인드 드릴게요</p>
          <p>• 수료 시 달팽이아지트 60평 펜션 10만원 할인권 제공 🎁</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          asChild
          size="lg"
          className="rounded-full h-12 bg-yellow-400 text-black hover:bg-yellow-300"
        >
          <a
            href={`https://pf.kakao.com/_${SITE.kakaoChannel}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 카톡 sool9241 바로가기
          </a>
        </Button>
        <Button asChild variant="outline" className="rounded-full h-11">
          <Link href="/">메인으로 돌아가기</Link>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground pt-4">
        문의 : {SITE.phone} · help@healingstay.com
      </p>
    </div>
  );
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string; price?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <Nav />
      <main className="flex-1 pt-24 pb-20 flex items-center">
        <Suspense fallback={<div className="container-narrow text-center py-10">로딩 중...</div>}>
          <SuccessContent searchParams={params} />
        </Suspense>
      </main>
      <KakaoChatBtn />
    </>
  );
}
