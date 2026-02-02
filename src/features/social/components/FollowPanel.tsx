"use client";

import { useState } from "react";

export default function FollowPanel() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const follow = async () => {
    setMessage(null);
    try {
      const res = await fetch("/api/social/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to follow");
      }
      setMessage("Followed.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const unfollow = async () => {
    setMessage(null);
    try {
      const res = await fetch(`/api/social/follow/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to unfollow");
      }
      setMessage("Unfollowed.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-zinc-900">Follow users</h2>
      <p className="mt-2 text-sm text-zinc-500">Enter a user ID to follow.</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          placeholder="User UUID"
          className="flex-1 rounded-md border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
        />
        <button
          onClick={follow}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Follow
        </button>
        <button
          onClick={unfollow}
          className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Unfollow
        </button>
      </div>
      {message ? (
        <div className="mt-3 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
          {message}
        </div>
      ) : null}
    </div>
  );
}