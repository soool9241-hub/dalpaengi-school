-- 🐌 달팽이멤버십 Supabase 스키마 v6 (6개 테이블)
-- https://zujmishjfpmyjuipncby.supabase.co → SQL Editor에서 통째로 실행
-- 핵심: 3단 코스(basic/standard/premium) + 통합 대기자 + 멤버십 자격

-- ─────────────────────────────────────────
-- 1. applicants : 빌더코스 신청자 (3단 공통)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS applicants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),

  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,

  -- v6: basic (기초 30만) / standard (기본 60만) / premium (프리미엄 120만)
  course_type TEXT NOT NULL,
  course_price INTEGER NOT NULL,
  cohort INTEGER DEFAULT 1,
  scheduled_date DATE,

  current_work TEXT,
  expectation TEXT,

  payment_status TEXT DEFAULT 'pending',
  payment_id TEXT,
  payment_method TEXT,
  paid_at TIMESTAMPTZ,

  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,

  status TEXT DEFAULT 'applied',
  notes TEXT,
  sms_welcome_sent BOOLEAN DEFAULT false,
  sms_reminder_sent BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_applicants_status ON applicants(status);
CREATE INDEX IF NOT EXISTS idx_applicants_cohort ON applicants(cohort);
CREATE INDEX IF NOT EXISTS idx_applicants_course ON applicants(course_type);
CREATE INDEX IF NOT EXISTS idx_applicants_phone ON applicants(phone);

ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_applicants" ON applicants;
CREATE POLICY "anon_insert_applicants" ON applicants FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "service_full_applicants" ON applicants;
CREATE POLICY "service_full_applicants" ON applicants FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────
-- 2. waitlist : 통합 대기자 (기본/프리미엄/스쿨)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),

  -- 'course_standard' / 'course_premium' / 'school'
  target_type TEXT NOT NULL,

  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,

  current_work TEXT,
  why_interested TEXT,
  expected_service TEXT,

  -- 업셀 추적
  has_taken_basic BOOLEAN DEFAULT false,
  has_taken_standard BOOLEAN DEFAULT false,

  status TEXT DEFAULT 'waiting',
  invited_at TIMESTAMPTZ,
  invite_sms_sent BOOLEAN DEFAULT false,

  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  notes TEXT,

  UNIQUE(phone, target_type)
);

CREATE INDEX IF NOT EXISTS idx_waitlist_target ON waitlist(target_type);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_waitlist" ON waitlist;
CREATE POLICY "anon_insert_waitlist" ON waitlist FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "service_full_waitlist" ON waitlist;
CREATE POLICY "service_full_waitlist" ON waitlist FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────
-- 3. live_registrations : 매주 토 무료 라이브
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS live_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),

  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,

  live_date DATE NOT NULL,
  live_topic TEXT,

  attended BOOLEAN DEFAULT false,
  sms_reminder_sent BOOLEAN DEFAULT false,

  utm_source TEXT,
  utm_campaign TEXT,

  UNIQUE(phone, live_date)
);

CREATE INDEX IF NOT EXISTS idx_live_date ON live_registrations(live_date);

ALTER TABLE live_registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_live" ON live_registrations;
CREATE POLICY "anon_insert_live" ON live_registrations FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "service_full_live" ON live_registrations;
CREATE POLICY "service_full_live" ON live_registrations FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────
-- 4. seat_config : 기수별 좌석 관리 (v6: basic만 활성)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS seat_config (
  id SERIAL PRIMARY KEY,
  course_type TEXT NOT NULL,
  cohort INTEGER NOT NULL DEFAULT 1,
  total_seats INTEGER NOT NULL,
  scheduled_date DATE NOT NULL,
  earlybird_price INTEGER,
  regular_price INTEGER NOT NULL,
  earlybird_deadline TIMESTAMPTZ,
  enrollment_deadline TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE(course_type, cohort)
);

INSERT INTO seat_config (course_type, cohort, total_seats, scheduled_date, earlybird_price, regular_price, earlybird_deadline, is_active)
VALUES
  -- 기초: 상시 신청 · 얼리버드 25만 / 정가 30만
  ('basic',    1,  20, '2026-05-31', 250000,  300000, '2026-05-17T23:59:59+09:00', true),
  -- 기본: 수요 기반 · SOLD OUT 시작 · 60만
  ('standard', 1, 100, '2026-07-15', NULL,    600000, NULL, false),
  -- 프리미엄: 수요 기반 · SOLD OUT 시작 · 120만
  ('premium',  1, 100, '2026-09-20', NULL,   1200000, NULL, false)
ON CONFLICT (course_type, cohort) DO NOTHING;

ALTER TABLE seat_config ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_seats" ON seat_config;
CREATE POLICY "anon_read_seats" ON seat_config FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "service_full_seats" ON seat_config;
CREATE POLICY "service_full_seats" ON seat_config FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────
-- 5. memberships : 멤버십 자격 (1년 / 평생)
--    · 기본 결제 → yearly_1year 자동 부여
--    · 프리미엄 결제 → lifetime 자동 부여
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS memberships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),

  applicant_id UUID REFERENCES applicants(id),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,

  -- 'yearly_1year' (1년) / 'lifetime' (평생)
  membership_type TEXT NOT NULL,
  -- 'course_standard' / 'course_premium' / 'direct'
  granted_from TEXT NOT NULL,
  source_payment_id TEXT,

  granted_at TIMESTAMPTZ DEFAULT now(),
  -- 1년 멤버십만 사용 (평생은 NULL)
  expires_at TIMESTAMPTZ,

  status TEXT DEFAULT 'active',

  monthly_sessions_attended INTEGER DEFAULT 0,
  services_built INTEGER DEFAULT 0,

  notes TEXT,

  UNIQUE(phone, membership_type)
);

CREATE INDEX IF NOT EXISTS idx_membership_status ON memberships(status);
CREATE INDEX IF NOT EXISTS idx_membership_type ON memberships(membership_type);

ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_full_memberships" ON memberships;
CREATE POLICY "service_full_memberships" ON memberships FOR ALL TO service_role USING (true) WITH CHECK (true);
-- ⚠ anon 접근 불가 (service_role 전용)

-- ─────────────────────────────────────────
-- 6. cases : 사례 페이지 데이터
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),

  title TEXT NOT NULL,
  -- 'course' / 'school' / 'hackathon'
  category TEXT NOT NULL,
  description TEXT,
  case_date TEXT,
  participants TEXT,
  duration TEXT,

  image_url TEXT,
  highlights TEXT[],
  testimonial TEXT,
  testimonial_name TEXT,

  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_cases" ON cases;
CREATE POLICY "anon_read_cases" ON cases FOR SELECT TO anon USING (is_published = true);
DROP POLICY IF EXISTS "service_full_cases" ON cases;
CREATE POLICY "service_full_cases" ON cases FOR ALL TO service_role USING (true) WITH CHECK (true);
