"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

type ActivityRow = {
  id: string;
  type: "post" | "progress";
  user_id: string;
  content: string;
  created_at: string;
};

export default function HomeActivity() {
  const [items, setItems] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState(true);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/public/activity", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load activity");
      }
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!live) return;

    const supabase = createClient();
    const postChannel = supabase
      .channel("home-posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        () => load()
      )
      .subscribe();

    const progressChannel = supabase
      .channel("home-progress")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "progress" },
        () => load()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postChannel);
      supabase.removeChannel(progressChannel);
    };
  }, [live]);

  const title = useMemo(() => (live ? "Live activity" : "Recent activity"), [live]);
  const initialsFor = (value: string) => value.slice(0, 2).toUpperCase();
  const timeFor = (value: string) =>
    new Date(value).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
          <p className="mt-1 text-sm text-zinc-500">
            See what learners are sharing right now.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setLive((prev) => !prev)}>
            {live ? "Live" : "Paused"}
          </Button>
          <Button variant="secondary" onClick={load}>
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="mt-6 space-y-3">
          <div className="h-16 w-full animate-pulse rounded-xl bg-zinc-100" />
          <div className="h-16 w-full animate-pulse rounded-xl bg-zinc-100" />
          <div className="h-16 w-full animate-pulse rounded-xl bg-zinc-100" />
        </div>
      ) : error ? (
        <p className="mt-6 text-sm text-red-600">{error}</p>
      ) : items.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-500">
          No activity yet. Encourage someone to post an update.
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((item) => (
            <li
              key={`${item.type}-${item.id}`}
              className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300 hover:shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
                    {initialsFor(item.user_id)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-zinc-900">
                        Learner {item.user_id.slice(0, 6)}
                      </span>
                      <Badge variant={item.type === "post" ? "muted" : "success"}>
                        {item.type === "post" ? "Post" : "Progress"}
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-500">
                      @{item.user_id.slice(0, 8)} · {timeFor(item.created_at)}
                    </p>
                    <p className="text-sm text-zinc-700">{item.content}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-full px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-50"
                  aria-label="More actions"
                >
                  •••
                </button>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-3 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="rounded-full border border-zinc-200 px-2 py-1 text-xs">
                    Like
                  </Button>
                  <Button variant="ghost" className="rounded-full border border-zinc-200 px-2 py-1 text-xs">
                    Comment
                  </Button>
                  <Button variant="ghost" className="rounded-full border border-zinc-200 px-2 py-1 text-xs">
                    Save
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <span>12 likes</span>
                  <span>4 comments</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex items-center justify-between text-sm">
        <p className="text-zinc-500">Want more? Visit the full feed.</p>
        <a href="/feed" className="font-medium text-zinc-900 hover:text-zinc-700">
          View feed →
        </a>
      </div>
    </div>
  );
}
