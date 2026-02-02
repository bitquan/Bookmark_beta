"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

type Props = {
  mode: Mode;
};

export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const supabase = createClient();

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Signed in. You can open chat now.");
        router.refresh();
        router.push("/account");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Account created. Check your email if confirmation is enabled.");
        router.refresh();
        router.push("/account");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-zinc-900">
        {mode === "login" ? "Log in" : "Sign up"}
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        Use your email and password to {mode === "login" ? "sign in" : "create an account"}.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-zinc-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="••••••••"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
        >
          {loading ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
        </button>
      </div>

      {message ? (
        <div className="mt-4 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
          {message}
        </div>
      ) : null}
    </div>
  );
}