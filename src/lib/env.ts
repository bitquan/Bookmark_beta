import "server-only";
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  OPEN_LIBRARY_BASE_URL: z.string().url().optional(),
});

type Env = z.infer<typeof envSchema>;

const rawEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  OPEN_LIBRARY_BASE_URL: process.env.OPEN_LIBRARY_BASE_URL,
};

const isTest = process.env.NODE_ENV === "test";

const resolvedEnv = (() => {
  if (isTest) {
    return rawEnv as Env;
  }

  const parsed = envSchema.safeParse(rawEnv);
  if (!parsed.success) {
    console.error("Invalid environment variables", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
})();

export const env = resolvedEnv;
