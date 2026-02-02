"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type UserInfo = {
  id: string;
  email: string | null;
};

export default function AccountPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

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
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Account</h1>
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
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={copyUserId}
                className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Copy user ID
              </button>
              <button
                onClick={signOut}
                className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-zinc-600">Not signed in.</p>
        )}
      </div>
    </div>
  );
}