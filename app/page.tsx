import { Nav } from "@/components/shared/nav";
import { FloatingCTA } from "@/components/shared/floating-cta";
import { KakaoChatBtn } from "@/components/shared/kakao-chat-btn";
import { Hero } from "@/components/landing/hero";
import { AiBuildingDayBanner } from "@/components/landing/ai-building-day-banner";
import { Philosophy } from "@/components/landing/philosophy";
import { Declaration365 } from "@/components/landing/declaration-365";
import { ServiceGoals } from "@/components/landing/service-goals";
import { ThreeTracks } from "@/components/landing/three-tracks";
import { ThreeContents } from "@/components/landing/three-contents";
import { Members } from "@/components/landing/members";
import { Host } from "@/components/landing/host";
import { HostProof } from "@/components/landing/host-proof";
import { CoursesTeaser } from "@/components/landing/courses-teaser";
import { LiveTeaser } from "@/components/landing/live-teaser";
import { Voices } from "@/components/landing/voices";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

// 메인 랜딩 - 빌더코스 3단 중심 (멤버십 서사는 추후 재활성)
// 제거된 섹션: Roadmap (12개월 여정), SchoolTeaser (멤버십 대기자)
export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <AiBuildingDayBanner />
        <Philosophy />
        <Declaration365 />
        <ServiceGoals />
        <ThreeTracks />
        <ThreeContents />
        <Members />
        <Host />
        <HostProof />
        <CoursesTeaser />
        <LiveTeaser />
        <Voices />
        <FAQ />
      </main>
      <Footer />
      <FloatingCTA />
      <KakaoChatBtn />
    </>
  );
}
