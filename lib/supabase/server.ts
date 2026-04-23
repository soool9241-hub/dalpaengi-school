import { createClient } from "@supabase/supabase-js";

// 서버 전용 Supabase (service_role) - 절대 브라우저 노출 금지
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
