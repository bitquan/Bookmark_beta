"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

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
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
    setMessageType(null);

    try {
      const supabase = createClient();

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Signed in. You can open chat now.");
        setMessageType("success");
        router.refresh();
        router.push("/account");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Account created. Check your email if confirmation is enabled.");
        setMessageType("success");
        router.refresh();
        router.push("/account");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unknown error");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-zinc-900">
        {mode === "login" ? "Log in" : "Sign up"}
      </h2>
      <p className="mt-2 text-sm text-zinc-500">
        Use your email and password to {mode === "login" ? "sign in" : "create an account"}.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="auth-email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="auth-password"
            className="text-sm font-medium text-zinc-700"
          >
            Password
          </label>
          <input
            id="auth-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="••••••••"
          />
          <p className="mt-2 text-xs text-zinc-500">
            Use at least 8 characters.
          </p>
        </div>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          className="w-full"
        >
          {loading ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
        </Button>
      </div>

      {message ? (
        <div
          role={messageType === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`mt-4 rounded-md border p-3 text-sm ${
            messageType === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}