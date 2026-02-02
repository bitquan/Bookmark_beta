"use client";

import { useEffect, useState } from "react";

type UserRow = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

export default function UserList() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/users", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Failed to load users");
        }
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-zinc-900">Recent users</h2>
      <p className="mt-2 text-sm text-zinc-500">
        Pick a user ID to start a chat thread.
      </p>

      {loading ? (
        <p className="mt-4 text-sm text-zinc-500">Loading users…</p>
      ) : error ? (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      ) : users.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-500">No profiles yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-zinc-100">
          {users.map((user) => (
            <li key={user.id} className="py-3 text-sm text-zinc-700">
              <div className="font-medium text-zinc-900">
                {user.full_name || user.username || "Unnamed user"}
              </div>
              <div className="text-xs text-zinc-500">{user.id}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}