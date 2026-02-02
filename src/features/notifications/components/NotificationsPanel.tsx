"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type NotificationRow = {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  created_at: string;
  read_at: string | null;
};

export default function NotificationsPanel() {
  const [items, setItems] = useState<NotificationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/notifications", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load notifications");
      }
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const markRead = async () => {
    const unreadIds = items.filter((item) => !item.read_at).map((item) => item.id);
    if (unreadIds.length === 0) return;

    try {
      const res = await fetch("/api/notifications/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationIds: unreadIds }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to mark read");
      }
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  useEffect(() => {
    load();

    const supabase = createClient();
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        () => load()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Notifications</h2>
          <p className="mt-1 text-sm text-zinc-500">Recent activity updates.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            disabled={loading}
          >
            Refresh
          </button>
          <button
            onClick={markRead}
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Mark all read
          </button>
        </div>
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-zinc-500">Loading notifications…</p>
      ) : error ? (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      ) : items.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-500">No notifications yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-zinc-100">
          {items.map((item) => (
            <li key={item.id} className="py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-900">{item.type}</p>
                  <p className="text-xs text-zinc-500">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
                {item.read_at ? (
                  <span className="text-xs text-zinc-400">Read</span>
                ) : (
                  <span className="text-xs font-medium text-amber-600">Unread</span>
                )}
              </div>
              <pre className="mt-2 whitespace-pre-wrap rounded-md bg-zinc-50 p-2 text-xs text-zinc-600">
                {JSON.stringify(item.payload, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}