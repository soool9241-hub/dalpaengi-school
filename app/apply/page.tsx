import { Suspense } from "react";
import { Nav } from "@/components/shared/nav";
import { KakaoChatBtn } from "@/components/shared/kakao-chat-btn";
import { ApplyForm } from "@/components/apply/apply-form";

export const metadata = {
  title: "빌더 기초 신청",
  description: "달팽이멤버십 빌더 기초 1기 신청 폼 (3시간 체험형)",
};

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-24 pb-20">
        <div className="container-narrow max-w-xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green-dark text-xs font-bold mb-4">
              🐌 1기 모집 중
            </div>
            <h1 className="headline-md mb-3">빌더 기초 신청</h1>
            <p className="text-muted-foreground">
              먼저, 한 번 만나봐요.
              <br />
              첫 만남을 준비할게요.
            </p>
          </div>

          <Suspense fallback={<div className="text-center py-10">로딩 중...</div>}>
            <ApplyForm />
          </Suspense>
        </div>
      </main>
      <KakaoChatBtn />
    </>
  );
}
