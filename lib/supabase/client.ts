import { createClient } from "@supabase/supabase-js";

// 클라이언트용 Supabase (anon) - RLS 정책으로 INSERT 중심
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);
