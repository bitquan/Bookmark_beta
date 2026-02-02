"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import UserList from "@/features/users/components/UserList";

export default function ChatIndexPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  const goToThread = () => {
    if (!userId.trim()) return;
    router.push(`/chat/${userId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <div className="rounded-xl border border-zinc-200 bg-white p-8">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">Chat</h1>
            <p className="mt-2 text-sm text-zinc-500">
              Enter a user ID to open a thread.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="UUID of the user"
              className="flex-1 rounded-md border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            <button
              onClick={goToThread}
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Open Thread
            </button>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            You must be authenticated to fetch messages.
          </p>
        </div>

        <UserList />
      </div>
    </div>
  );
}