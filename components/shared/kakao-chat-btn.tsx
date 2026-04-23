"use client";

import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

// 우하단 고정 카카오톡 상담 버튼
export function KakaoChatBtn() {
  return (
    <a
      href={`https://pf.kakao.com/_${SITE.kakaoChannel}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40 flex items-center gap-2 rounded-full bg-yellow-400 text-black px-4 py-3 shadow-xl hover:bg-yellow-300 transition-all hover:scale-105"
      aria-label="카카오톡 상담"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-sm font-semibold">카톡 상담</span>
    </a>
  );
}
