"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function FollowPanel() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const follow = async () => {
    setMessage(null);
    setMessageType(null);
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
      setMessageType("success");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Unknown error");
      setMessageType("error");
    }
  };

  const unfollow = async () => {
    setMessage(null);
    setMessageType(null);
    try {
      const res = await fetch(`/api/social/follow/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to unfollow");
      }
      setMessage("Unfollowed.");
      setMessageType("success");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Unknown error");
      setMessageType("error");
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Follow users</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Enter a user ID to follow and see their updates.
          </p>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          Growth
        </span>
      </div>
      <label htmlFor="follow-user-id" className="sr-only">
        User ID
      </label>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          id="follow-user-id"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          placeholder="User UUID"
          className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
        />
        <Button onClick={follow}>Follow</Button>
        <Button variant="secondary" onClick={unfollow}>
          Unfollow
        </Button>
      </div>
      <div className="mt-4 rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-500">
        Pro tip: Follow learners who post daily to keep your feed active.
      </div>
      {message ? (
        <div
          role={messageType === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`mt-3 rounded-md border p-3 text-sm ${
            messageType === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}