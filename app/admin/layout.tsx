import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import { headers } from "next/headers";

// 관리자 레이아웃 - 인증 체크 + 사이드바
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // 로그인 페이지는 인증 스킵
  if (!pathname.startsWith("/admin/login")) {
    const ok = await isAuthenticated();
    if (!ok) redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-brand-paper">
      <header className="border-b border-brand-line bg-white">
        <div className="container-wide flex items-center justify-between h-14">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-sm">
            <span className="text-lg">🐌</span>
            <span>달팽이스쿨 Admin</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link href="/admin" className="px-3 py-1 rounded hover:bg-muted">
              대시보드
            </Link>
            <Link
              href="/admin/applicants"
              className="px-3 py-1 rounded hover:bg-muted"
            >
              신청자
            </Link>
            <Link
              href="/admin/members"
              className="px-3 py-1 rounded hover:bg-muted"
            >
              멤버십
            </Link>
            <Link href="/" className="px-3 py-1 rounded text-muted-foreground">
              ← 사이트
            </Link>
          </nav>
        </div>
      </header>
      <main className="container-wide py-8">{children}</main>
    </div>
  );
}
