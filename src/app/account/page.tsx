"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

type UserInfo = {
  id: string;
  email: string | null;
};

export default function AccountPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.getUser();
      if (authError) {
        setError(authError.message);
        return;
      }
      if (!data.user) {
        setUser(null);
        return;
      }
      setUser({ id: data.user.id, email: data.user.email ?? null });
    };

    loadUser();
  }, []);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  };

  const copyUserId = async () => {
    if (!user?.id) return;
    await navigator.clipboard.writeText(user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-zinc-900">Account</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Manage your authentication session and account details.
          </p>
        </header>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        {error ? (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        ) : user ? (
          <div className="mt-4 space-y-2 text-sm text-zinc-700">
            <p>
              <span className="font-medium">User ID:</span> {user.id}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-xs text-zinc-500">
              Use this ID to start chats and follow requests.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="secondary" onClick={copyUserId}>
                Copy user ID
              </Button>
              <Button variant="danger" onClick={signOut}>
                Sign out
              </Button>
            </div>
            {copied ? (
              <p className="text-xs text-emerald-600">User ID copied.</p>
            ) : null}
          </div>
        ) : (
          <p className="mt-4 text-sm text-zinc-600">Not signed in.</p>
        )}
        </div>
      </div>
    </div>
  );
}