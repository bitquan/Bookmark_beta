"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

type FeedPost = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
};

type CommentRow = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

export default function Feed() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentsByPost, setCommentsByPost] = useState<Record<string, CommentRow[]>>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [noticeType, setNoticeType] = useState<"success" | "error" | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    setNotice(null);
    setNoticeType(null);
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
    setNotice(null);
    setNoticeType(null);
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
      setNotice("Post published.");
      setNoticeType("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setNoticeType("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleLike = async (post: FeedPost) => {
    setError(null);
    setNotice(null);
    setNoticeType(null);
    try {
      const res = post.likedByMe
        ? await fetch(`/api/social/likes/${post.id}`, { method: "DELETE" })
        : await fetch("/api/social/likes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId: post.id }),
          });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to update like");
      }
      await load();
      setNotice(post.likedByMe ? "Like removed." : "Post liked.");
      setNoticeType("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setNoticeType("error");
    }
  };

  const submitComment = async (postId: string) => {
    const text = commentDrafts[postId]?.trim();
    if (!text) return;
    setError(null);
    setNotice(null);
    setNoticeType(null);
    try {
      const res = await fetch("/api/social/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content: text }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to add comment");
      }
      setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
      await load();
      await loadComments(postId);
      setNotice("Comment added.");
      setNoticeType("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setNoticeType("error");
    }
  };

  const loadComments = async (postId: string) => {
    try {
      const res = await fetch(`/api/social/comments?postId=${postId}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load comments");
      }
      setCommentsByPost((prev) => ({ ...prev, [postId]: data }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setNoticeType("error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">Feed</h1>
            <p className="mt-2 text-sm text-zinc-500">
              Share updates and follow other learners.
            </p>
          </div>
          <Badge variant="muted">Community</Badge>
        </div>
        <div className="mt-4 space-y-3">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="h-24 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="Share an update…"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-400">
              {content.trim().length > 0
                ? `${content.trim().length} characters`
                : "Start a conversation with the community."}
            </p>
            <Button onClick={create}>Post</Button>
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Posting as @you</span>
            <span>Public</span>
          </div>
        </div>
      </div>

      {notice ? (
        <div
          role={noticeType === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`rounded-md border p-3 text-sm ${
            noticeType === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {notice}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-6">
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-200" />
          <div className="mt-4 space-y-3">
            <div className="h-20 w-full animate-pulse rounded bg-zinc-100" />
            <div className="h-20 w-full animate-pulse rounded bg-zinc-100" />
          </div>
        </div>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-6 text-sm text-zinc-500">
          No posts yet. Be the first to share an update.
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
                    {post.user_id.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`/profile/${post.user_id}`}
                        className="text-sm font-semibold text-zinc-900 hover:text-zinc-700"
                      >
                        Learner {post.user_id.slice(0, 6)}
                      </a>
                      <Badge variant="muted">Update</Badge>
                      <span className="text-xs text-zinc-400">
                        @{post.user_id.slice(0, 8)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-900">{post.content}</p>
                  </div>
                </div>
                <span className="text-xs text-zinc-400">
                  {new Date(post.created_at).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-3 text-xs text-zinc-500">
                <Button
                  variant="ghost"
                  className="rounded-full border border-zinc-200 px-3 py-1 text-xs"
                  onClick={() => toggleLike(post)}
                >
                  {post.likedByMe ? "Unlike" : "Like"}
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full border border-zinc-200 px-3 py-1 text-xs"
                  onClick={() => {
                    setOpenComments((prev) => ({
                      ...prev,
                      [post.id]: !prev[post.id],
                    }));
                    if (!commentsByPost[post.id]) {
                      loadComments(post.id);
                    }
                  }}
                >
                  {openComments[post.id] ? "Hide" : "Show"} comments
                </Button>
                <div className="flex items-center gap-2">
                  <Badge variant="muted">{post.likeCount} likes</Badge>
                  <Badge variant="muted">{post.commentCount} comments</Badge>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <label htmlFor={`comment-${post.id}`} className="sr-only">
                  Add a comment
                </label>
                <input
                  id={`comment-${post.id}`}
                  value={commentDrafts[post.id] ?? ""}
                  onChange={(event) =>
                    setCommentDrafts((prev) => ({
                      ...prev,
                      [post.id]: event.target.value,
                    }))
                  }
                  placeholder="Write a comment…"
                  className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
                <Button className="px-3 py-2 text-sm" onClick={() => submitComment(post.id)}>
                  Comment
                </Button>
              </div>
              {openComments[post.id] ? (
                <div className="mt-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3">
                  {commentsByPost[post.id]?.length ? (
                    <ul className="space-y-2 text-sm text-zinc-700">
                      {commentsByPost[post.id].map((comment) => (
                        <li
                          key={comment.id}
                          className="flex items-start gap-3 rounded-lg border border-zinc-100 bg-white p-3"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
                            {comment.user_id.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500">
                              @{comment.user_id.slice(0, 8)}
                            </p>
                            <p className="mt-1 text-sm text-zinc-800">
                              {comment.content}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-zinc-500">No comments yet.</p>
                  )}
                </div>
              ) : null}
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