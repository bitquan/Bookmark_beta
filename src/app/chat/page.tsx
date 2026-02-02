"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import UserList from "@/features/users/components/UserList";
import Button from "@/components/ui/Button";

export default function ChatIndexPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  const goToThread = () => {
    if (!userId.trim()) return;
    router.push(`/chat/${userId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Messages
          </p>
          <h1 className="text-3xl font-semibold text-zinc-900">
            Chat with learners
          </h1>
          <p className="text-sm text-zinc-500">
            Start a direct message with another learner or continue an existing
            conversation.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">
                    Start a new chat
                  </h2>
                  <p className="mt-2 text-sm text-zinc-500">
                    Enter a user ID to open a direct message thread.
                  </p>
                </div>
                <div className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                  Private
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-zinc-500">
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-600">
                  2 online
                </span>
                <span>Reply time · 1h</span>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <label htmlFor="chat-user-id" className="sr-only">
                  User ID
                </label>
                <input
                  id="chat-user-id"
                  value={userId}
                  onChange={(event) => setUserId(event.target.value)}
                  placeholder="UUID of the user"
                  className="flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
                <Button onClick={goToThread}>Open Thread</Button>
              </div>
              <div className="mt-4 rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-500">
                You must be authenticated to fetch and send messages.
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900">
                Quick tips
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-500">
                <li>• Use the user list to find active profiles.</li>
                <li>• Threads update in real time when messages arrive.</li>
                <li>• Keep messages focused on learning goals.</li>
              </ul>
            </div>
          </div>

          <UserList />
        </div>
      </div>
    </div>
  );
}