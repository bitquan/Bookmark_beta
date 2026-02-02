"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

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
  const [notice, setNotice] = useState<string | null>(null);
  const unreadCount = items.filter((item) => !item.read_at).length;

  const load = async () => {
    setLoading(true);
    setError(null);
    setNotice(null);
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
      setNotice("All notifications marked as read.");
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
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Notifications</h2>
          <p className="mt-1 text-sm text-zinc-500">Recent activity updates.</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 ? (
            <Badge variant="warning">{unreadCount} unread</Badge>
          ) : (
            <Badge variant="muted">All caught up</Badge>
          )}
          <Button variant="secondary" onClick={load} disabled={loading}>
            Refresh
          </Button>
          <Button onClick={markRead}>Mark all read</Button>
        </div>
      </div>

      {notice ? (
        <p
          role="status"
          aria-live="polite"
          className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700"
        >
          {notice}
        </p>
      ) : null}
      {loading ? (
        <div className="mt-4 space-y-3">
          <div className="h-16 animate-pulse rounded-xl bg-zinc-100" />
          <div className="h-16 animate-pulse rounded-xl bg-zinc-100" />
          <div className="h-16 animate-pulse rounded-xl bg-zinc-100" />
        </div>
      ) : error ? (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      ) : items.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-500">
          No notifications yet.
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
                    {item.type.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-zinc-900">
                        {item.type}
                      </p>
                      {item.read_at ? (
                        <Badge variant="muted">Read</Badge>
                      ) : (
                        <Badge variant="warning">Unread</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">
                      {new Date(item.created_at).toLocaleDateString()} · {" "}
                      {new Date(item.created_at).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-zinc-50 px-2 py-1 text-xs text-zinc-500">
                  {item.read_at ? "Seen" : "New"}
                </span>
              </div>
              <div className="mt-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                  Payload
                </p>
                <pre className="mt-2 whitespace-pre-wrap text-xs text-zinc-600">
                  {JSON.stringify(item.payload, null, 2)}
                </pre>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}