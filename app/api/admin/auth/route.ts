import { NextResponse } from "next/server";
import crypto from "crypto";

// 관리자 인증 - 단순 password 비교 + HttpOnly 세션 쿠키
// 실제 프로덕션은 NextAuth / Supabase Auth 권장
export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (!ADMIN_PASSWORD || !SESSION_SECRET) {
    return NextResponse.json(
      { error: "관리자 환경변수가 설정되지 않았어요" },
      { status: 500 }
    );
  }

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "비밀번호가 틀렸어요" }, { status: 401 });
  }

  // 7일 유효 서명 토큰
  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = `admin.${expires}`;
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");
  const token = `${payload}.${signature}`;

  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}

// DELETE - 로그아웃
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("admin_session");
  return res;
}

// 서버 컴포넌트에서 쓸 수 있는 검증 헬퍼 (export)
export function verifyAdminToken(token: string | undefined): boolean {
  if (!token || !SESSION_SECRET) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [role, expiresStr, sig] = parts;
  if (role !== "admin") return false;
  const expires = Number(expiresStr);
  if (!expires || Date.now() > expires) return false;
  const expected = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(`${role}.${expiresStr}`)
    .digest("hex");
  return sig === expected;
}
