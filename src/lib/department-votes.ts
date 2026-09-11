import { z } from "zod";

import { VOTE_DEPARTMENTS } from "@/data/department-roadmap";
export const departmentVoteSchema = z
  .object({
    id: z.string().uuid(),
    departments: z
      .array(z.enum(VOTE_DEPARTMENTS))
      .min(1)
      .max(6)
      .transform((values) => [...new Set(values)]),
    locale: z.enum(["es", "en"]),
    name: z.string().trim().max(100).optional().default(""),
    email: z
      .union([z.literal(""), z.string().trim().email().max(254)])
      .optional()
      .default(""),
    notify: z.boolean().default(false),
    website: z.string().max(0).optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.email && !value.notify)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["notify"],
        message: "Notification consent required",
      });
    if (value.notify && !value.email)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Email required for notifications",
      });
  });
