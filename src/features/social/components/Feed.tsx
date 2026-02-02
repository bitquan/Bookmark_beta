"use client";

import { useEffect, useState } from "react";

type FeedPost = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
};

export default function Feed() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState("");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/social/feed", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load feed");
      }
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const create = async () => {
    if (!content.trim()) return;
    setError(null);
    try {
      const res = await fetch("/api/social/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to create post");
      }
      setContent("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Feed</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Share updates and follow other learners.
        </p>
        <div className="mt-4 space-y-3">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="h-24 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="Share an update…"
          />
          <button
            onClick={create}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Post
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500">Loading feed…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-zinc-500">No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-xl border border-zinc-200 bg-white p-5"
            >
              <p className="text-sm text-zinc-500">{post.user_id}</p>
              <p className="mt-2 text-sm text-zinc-900">{post.content}</p>
              <p className="mt-3 text-xs text-zinc-400">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}