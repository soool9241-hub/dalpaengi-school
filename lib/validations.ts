import { z } from "zod";

const phoneSchema = z
  .string()
  .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, "올바른 휴대폰 번호를 입력해주세요")
  .transform((v) => v.replace(/[^0-9]/g, ""));

// v6 빌더코스 신청 - 3단 (basic/standard/premium)
export const applySchema = z.object({
  name: z.string().min(2, "이름은 2자 이상").max(50),
  phone: phoneSchema,
  email: z.string().email().optional().or(z.literal("")),
  course_type: z.enum(["basic", "standard", "premium"]),
  current_work: z.string().max(500).optional(),
  expectation: z.string().max(500).optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});
export type ApplyInput = z.infer<typeof applySchema>;

// v6 통합 대기자 - target_type 3종
export const waitlistSchema = z.object({
  target_type: z.enum(["course_standard", "course_premium", "school"]),
  name: z.string().min(2).max(50),
  phone: phoneSchema,
  email: z.string().email().optional().or(z.literal("")),
  current_work: z.string().max(500).optional(),
  why_interested: z.string().max(500).optional(),
  expected_service: z.string().max(500).optional(),
  has_taken_basic: z.boolean().optional(),
  has_taken_standard: z.boolean().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});
export type WaitlistInput = z.infer<typeof waitlistSchema>;

// 라이브 신청
export const liveRegisterSchema = z.object({
  name: z.string().min(2).max(50),
  phone: phoneSchema,
  email: z.string().email().optional().or(z.literal("")),
  live_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  live_topic: z.string().max(200).optional(),
  utm_source: z.string().optional(),
  utm_campaign: z.string().optional(),
});
export type LiveRegisterInput = z.infer<typeof liveRegisterSchema>;

// 멤버십 자격 부여 (결제 웹훅에서 호출)
export const membershipGrantSchema = z.object({
  applicant_id: z.string().uuid().optional(),
  course_type: z.enum(["standard", "premium"]),
  name: z.string().min(1),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal("")),
  payment_id: z.string().optional(),
});
export type MembershipGrantInput = z.infer<typeof membershipGrantSchema>;
