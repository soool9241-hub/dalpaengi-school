import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Pretendard 로컬 파일 준비 시 next/font/local로 교체
const pretendard = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-pretendard",
});

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dalpaengi-school.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "달팽이멤버십 — 누구나 할 순 있지만, 아무나 할 순 없습니다",
    template: "%s · 달팽이멤버십",
  },
  description:
    "1년간 12개의 서비스를 함께 만드는 멤버십. 빌더코스에서 먼저 만나봐요. 🐌",
  keywords: [
    "바이브코딩",
    "AI 자동화",
    "1인 사업자",
    "빌더코스",
    "달팽이멤버십",
    "Claude Code",
    "노코드",
    "비개발자",
    "멤버십",
  ],
  authors: [{ name: "임솔", url: SITE_URL }],
  creator: "달팽이멤버십",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    title: "달팽이멤버십 — 누구나 할 순 있지만, 아무나 할 순 없습니다",
    description:
      "1년간 12개의 서비스를 함께 만드는 멤버십. 빌더코스에서 먼저 만나봐요.",
    siteName: "달팽이멤버십",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "달팽이멤버십" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "달팽이멤버십",
    description: "1년간 12개의 서비스를 함께 만드는 멤버십 🐌",
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster position="top-center" richColors />

        {/* Google Analytics 4 */}
        {GA4_ID && GA4_ID !== "G-XXXXXXXXXX" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
