import crypto from "crypto";
import { cookies } from "next/headers";

// 관리자 세션 검증 - 서버 컴포넌트/API 공통
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "";

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

// 서버 컴포넌트에서 현재 세션 유효성 확인
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get("admin_session")?.value;
  return verifyAdminToken(token);
}
