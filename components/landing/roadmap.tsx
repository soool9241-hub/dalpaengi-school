"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const phases = [
  {
    name: "Foundation",
    color: "bg-brand-green/10 text-brand-green-dark",
    months: [
      { m: 1, title: "팔리는 랜딩페이지", result: "내 사업이 인터넷에 존재하기 시작" },
      { m: 2, title: "온라인 예약 시스템", result: "고객이 24/7 알아서 예약" },
      { m: 3, title: "고객 관리 CRM", result: "모든 고객을 이름과 취향으로 기억" },
    ],
  },
  {
    name: "Automation",
    color: "bg-amber-100 text-amber-800",
    months: [
      { m: 4, title: "자동 SMS/카톡 시퀀스", result: "적시에 정확한 메시지가 자동으로" },
      { m: 5, title: "온라인 결제 연동", result: "24시간 결제 받고 자동 영수증" },
      { m: 6, title: "매출 대시보드", result: "매일 아침 내 사업 건강 상태를 한눈에" },
    ],
  },
  {
    name: "Growth",
    color: "bg-blue-100 text-blue-800",
    months: [
      { m: 7, title: "리뷰 자동 수집", result: "요청 안 해도 후기가 쌓임" },
      { m: 8, title: "AI 콘텐츠 자동 생성", result: "블로그·SNS·뉴스레터 자동화" },
      { m: 9, title: "마케팅 퍼널 자동화", result: "처음 온 사람이 단골로" },
    ],
  },
  {
    name: "Scale",
    color: "bg-purple-100 text-purple-800",
    months: [
      { m: 10, title: "멀티채널 통합", result: "카톡·인스타·네이버 한 화면에" },
      { m: 11, title: "데이터 분석 + AI 인사이트", result: "AI가 다음 할 일 알려줌" },
      { m: 12, title: "올인원 — 나만의 사업 OS", result: "내 사업은 시스템이 굴려요" },
    ],
  },
];

// 12개월 여정 — 4 페이즈 아코디언 (커리큘럼 나열 아닌 흐름)
export function Roadmap() {
  return (
    <section className="section-padding bg-brand-paper">
      <div className="container-narrow">
        <div className="text-center mb-12 space-y-3">
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            12개월 여정
          </p>
          <h2 className="headline-md">
            1년 후, 내 사업은
            <br />
            시스템이 굴러갑니다
          </h2>
        </div>

        <Accordion defaultValue={["Foundation"]} className="space-y-3">
          {phases.map((p) => (
            <AccordionItem
              key={p.name}
              value={p.name}
              className="bg-white rounded-2xl border-0 px-5"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span
                    className={cn("text-xs font-bold px-2.5 py-1 rounded-full", p.color)}
                  >
                    {p.name}
                  </span>
                  <span className="text-base font-semibold">
                    Month {p.months[0].m}~{p.months[2].m}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 pt-2">
                  {p.months.map((mm) => (
                    <li
                      key={mm.m}
                      className="flex gap-3 py-2 border-t border-brand-line first:border-t-0"
                    >
                      <span className="flex-shrink-0 w-8 text-xs font-bold text-brand-green-dark mt-0.5">
                        M{mm.m}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{mm.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          → {mm.result}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
