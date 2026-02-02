"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

type UserRow = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

export default function UserList() {
  const router = useRouter();
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
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">Recent users</h2>
      <p className="mt-2 text-sm text-zinc-500">
        Pick a user ID to start a chat thread.
      </p>

      {loading ? (
        <div className="mt-4 space-y-2">
          <div className="h-10 animate-pulse rounded bg-zinc-100" />
          <div className="h-10 animate-pulse rounded bg-zinc-100" />
          <div className="h-10 animate-pulse rounded bg-zinc-100" />
        </div>
      ) : error ? (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </p>
      ) : users.length === 0 ? (
        <div className="mt-4 rounded-md border border-dashed border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-500">
          No profiles yet.
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {users.map((user) => {
            const displayName =
              user.full_name || user.username || "Unnamed user";
            const initials = displayName
              .split(" ")
              .map((part) => part[0])
              .filter(Boolean)
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <li
                key={user.id}
                className="rounded-2xl border border-zinc-100 bg-white px-4 py-4 text-sm text-zinc-700 shadow-sm transition hover:border-zinc-200 hover:bg-zinc-50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
                      {initials || "U"}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="font-medium text-zinc-900">
                          {displayName}
                        </div>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-600">
                          Online
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">
                        {"Hey!"} {"How's"} your learning going? 🙂
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-zinc-400">
                    10:42 AM
                    <div className="mt-2 inline-flex items-center rounded-full bg-zinc-900 px-2 py-0.5 text-[11px] text-white">
                      2
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                  <span>@{user.username || user.id.slice(0, 8)}</span>
                  <Button
                    variant="secondary"
                    onClick={() => router.push(`/chat/${user.id}`)}
                    className="px-3 py-1.5 text-xs"
                  >
                    Message
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}