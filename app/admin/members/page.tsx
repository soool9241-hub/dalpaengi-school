import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const supabase = createServerClient();
    const [wl, mem] = await Promise.all([
      supabase
        .from("waitlist")
        .select("id, created_at, target_type, name, phone, email, status")
        .order("created_at", { ascending: false })
        .limit(200),
      supabase
        .from("memberships")
        .select(
          "id, granted_at, name, phone, membership_type, granted_from, status, expires_at"
        )
        .order("granted_at", { ascending: false })
        .limit(200),
    ]);
    return {
      waitlist: wl.data || [],
      memberships: mem.data || [],
    };
  } catch {
    return { waitlist: [], memberships: [] };
  }
}

const TARGET_LABEL: Record<string, string> = {
  course_standard: "빌더 기본",
  course_premium: "빌더 프리미엄",
  school: "달팽이스쿨",
};

const MEMBERSHIP_LABEL: Record<string, string> = {
  yearly_1year: "1년 멤버십",
  lifetime: "평생 멤버십",
};

export default async function MembersAdminPage() {
  const { waitlist, memberships } = await getData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">대기자 · 멤버십</h1>
        <p className="text-sm text-muted-foreground mt-1">
          수요 기반 운영 · 임계점 도달 시 오픈 공지 일괄 발송
        </p>
      </div>

      {/* 대기자 */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">대기자</h2>
          <button
            type="button"
            className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-50"
            disabled
            title="P6 이후 구현 예정"
          >
            📢 오픈 공지 일괄 발송 (준비 중)
          </button>
        </div>

        <Card className="border-0 bg-white overflow-hidden">
          {waitlist.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              아직 대기자가 없어요
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-brand-paper border-b border-brand-line">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold">일시</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">대상</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">이름</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">전화</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {waitlist.map((r: typeof waitlist[number]) => (
                    <tr
                      key={r.id}
                      className="border-b border-brand-line last:border-0 hover:bg-muted/30"
                    >
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString("ko-KR")}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className="bg-amber-100 text-amber-800 border-0 text-[10px]">
                          {TARGET_LABEL[r.target_type] || r.target_type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-medium">{r.name}</td>
                      <td className="px-4 py-3 text-xs font-mono">{r.phone}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {r.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </section>

      {/* 멤버십 */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">멤버십 자격</h2>
        <Card className="border-0 bg-white overflow-hidden">
          {memberships.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              아직 멤버십 자격자가 없어요
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-brand-paper border-b border-brand-line">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold">부여일</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">이름</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">전화</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">등급</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">근거</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">만료</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {memberships.map((m: typeof memberships[number]) => (
                    <tr
                      key={m.id}
                      className="border-b border-brand-line last:border-0 hover:bg-muted/30"
                    >
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {new Date(m.granted_at).toLocaleDateString("ko-KR")}
                      </td>
                      <td className="px-4 py-3 font-medium">{m.name}</td>
                      <td className="px-4 py-3 text-xs font-mono">{m.phone}</td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            m.membership_type === "lifetime"
                              ? "bg-brand-green-dark text-white border-0 text-[10px]"
                              : "bg-brand-green/10 text-brand-green-dark border-0 text-[10px]"
                          }
                        >
                          {MEMBERSHIP_LABEL[m.membership_type] || m.membership_type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {m.granted_from}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {m.expires_at
                          ? new Date(m.expires_at).toLocaleDateString("ko-KR")
                          : "평생"}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {m.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}
