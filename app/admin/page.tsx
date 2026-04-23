import { Card } from "@/components/ui/card";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const supabase = createServerClient();
    const [applicants, waitlist, memberships, live] = await Promise.all([
      supabase.from("applicants").select("*", { count: "exact", head: true }),
      supabase.from("waitlist").select("*", { count: "exact", head: true }),
      supabase
        .from("memberships")
        .select("*", { count: "exact", head: true })
        .eq("status", "active"),
      supabase
        .from("live_registrations")
        .select("*", { count: "exact", head: true }),
    ]);
    return {
      applicants: applicants.count || 0,
      waitlist: waitlist.count || 0,
      memberships: memberships.count || 0,
      live: live.count || 0,
    };
  } catch {
    return { applicants: 0, waitlist: 0, memberships: 0, live: 0 };
  }
}

export default async function AdminDashboard() {
  const s = await getStats();

  const tiles = [
    { label: "누적 신청자", value: s.applicants, color: "text-brand-green-dark" },
    { label: "대기자 (전체)", value: s.waitlist, color: "text-amber-700" },
    { label: "활성 멤버십", value: s.memberships, color: "text-blue-700" },
    { label: "라이브 신청", value: s.live, color: "text-purple-700" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-sm text-muted-foreground mt-1">
          달팽이스쿨 운영 현황 한눈에
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tiles.map((t) => (
          <Card key={t.label} className="border-0 bg-white p-6">
            <p className="text-xs text-muted-foreground">{t.label}</p>
            <p className={`text-3xl font-bold mt-2 ${t.color}`}>
              {t.value.toLocaleString()}
            </p>
          </Card>
        ))}
      </div>

      <Card className="border-0 bg-white p-6 space-y-3">
        <h2 className="text-base font-semibold">빠른 실행</h2>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <a
            href="/admin/applicants"
            className="p-4 rounded-xl bg-brand-paper hover:bg-muted transition-colors"
          >
            📋 신청자 목록 보기 →
          </a>
          <a
            href="/admin/members"
            className="p-4 rounded-xl bg-brand-paper hover:bg-muted transition-colors"
          >
            💎 대기자 · 멤버십 관리 →
          </a>
          <a
            href="https://zujmishjfpmyjuipncby.supabase.co"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-brand-paper hover:bg-muted transition-colors"
          >
            🔗 Supabase 대시보드 →
          </a>
        </div>
      </Card>
    </div>
  );
}
