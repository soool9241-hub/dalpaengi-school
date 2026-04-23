import { Nav } from "@/components/shared/nav";
import { FloatingCTA } from "@/components/shared/floating-cta";
import { KakaoChatBtn } from "@/components/shared/kakao-chat-btn";
import { Hero } from "@/components/landing/hero";
import { Philosophy } from "@/components/landing/philosophy";
import { Declaration365 } from "@/components/landing/declaration-365";
import { ServiceGoals } from "@/components/landing/service-goals";
import { ThreeTracks } from "@/components/landing/three-tracks";
import { ThreeContents } from "@/components/landing/three-contents";
import { Members } from "@/components/landing/members";
import { Roadmap } from "@/components/landing/roadmap";
import { Host } from "@/components/landing/host";
import { HostProof } from "@/components/landing/host-proof";
import { CoursesTeaser } from "@/components/landing/courses-teaser";
import { SchoolTeaser } from "@/components/landing/school-teaser";
import { LiveTeaser } from "@/components/landing/live-teaser";
import { Voices } from "@/components/landing/voices";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

// 메인 랜딩 v6 전체 섹션 조립 (감정 곡선 순서)
export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Philosophy />
        <Declaration365 />
        <ServiceGoals />
        <ThreeTracks />
        <ThreeContents />
        <Members />
        <Roadmap />
        <Host />
        <HostProof />
        <CoursesTeaser />
        <SchoolTeaser />
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
