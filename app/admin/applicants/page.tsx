import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type ApplicantRow = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  course_type: string;
  course_price: number;
  status: string;
  payment_status: string;
  current_work: string | null;
};

async function getApplicants(): Promise<ApplicantRow[]> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("applicants")
      .select(
        "id, created_at, name, phone, email, course_type, course_price, status, payment_status, current_work"
      )
      .order("created_at", { ascending: false })
      .limit(200);
    return (data as ApplicantRow[]) || [];
  } catch {
    return [];
  }
}

const COURSE_LABEL: Record<string, string> = {
  basic: "기초",
  standard: "기본",
  premium: "프리미엄",
};

export default async function ApplicantsAdminPage() {
  const rows = await getApplicants();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">신청자</h1>
        <p className="text-sm text-muted-foreground mt-1">
          최근 200건 · 시간 역순
        </p>
      </div>

      <Card className="border-0 bg-white overflow-hidden">
        {rows.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            아직 신청자가 없어요
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-brand-paper border-b border-brand-line">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold">일시</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold">이름</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold">전화</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold">코스</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold">가격</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold">결제</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold">상태</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-brand-line last:border-0 hover:bg-muted/30"
                  >
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3 text-xs font-mono">{r.phone}</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-brand-green/10 text-brand-green-dark border-0 text-[10px]">
                        {COURSE_LABEL[r.course_type] || r.course_type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right text-xs">
                      {r.course_price.toLocaleString()}원
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          r.payment_status === "paid"
                            ? "bg-brand-green text-white border-0 text-[10px]"
                            : "bg-muted text-muted-foreground border-0 text-[10px]"
                        }
                      >
                        {r.payment_status === "paid" ? "완료" : "대기"}
                      </Badge>
                    </td>
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
    </div>
  );
}
