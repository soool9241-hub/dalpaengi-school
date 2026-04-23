"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/constants";

// FAQ — 6개 (v6: "왜 오직 1개만?" 추가)
export function FAQ() {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <div className="text-center mb-10 space-y-3">
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            자주 묻는 질문
          </p>
          <h2 className="headline-md">궁금한 점</h2>
        </div>
        <Accordion className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-brand-paper rounded-2xl border-0 px-5"
            >
              <AccordionTrigger className="hover:no-underline text-left">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
