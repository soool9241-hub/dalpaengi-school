import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";

// 푸터 — 연락처 + 링크 + 저작권
export function Footer() {
  return (
    <footer className="border-t border-brand-line bg-white">
      <div className="container-wide py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="text-2xl">🐌</span>
              <span>달팽이멤버십</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              우리는 365일간,
              <br />
              사람들이 사랑하는 서비스를
              <br />
              만들고 · 팔고 · 공유합니다.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">
              메뉴
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/apply"
                  className="text-sm text-foreground/80 hover:text-foreground"
                >
                  빌더 기초 신청
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">
              문의
            </p>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>{SITE.phone}</li>
              <li>{SITE.email}</li>
              <li>
                <a
                  href={`https://pf.kakao.com/_${SITE.kakaoChannel}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  카톡: {SITE.kakaoChannel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-brand-line flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} 달팽이멤버십 · 사업자 604-02-95735 (스토리팜)
          </p>
          <p>전북 완주군 소양면 해월신왕길 92</p>
        </div>
      </div>
    </footer>
  );
}
