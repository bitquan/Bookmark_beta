"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Message = {
  id: string;
  sender_id: string;
  recipient_id: string;
  body: string;
  created_at: string;
};

type Props = {
  userId?: string;
};

export default function ChatThreadClient({ userId }: Props) {
  const params = useParams<{ userId?: string }>();
  const resolvedUserId =
    userId ??
    (Array.isArray(params?.userId) ? params?.userId[0] : params?.userId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const title = useMemo(
    () => `Chat with ${resolvedUserId ?? ""}`,
    [resolvedUserId]
  );

  const isValidUserId =
    typeof resolvedUserId === "string" &&
    resolvedUserId.length > 0 &&
    resolvedUserId !== "undefined";

  const loadThread = async () => {
    if (!isValidUserId) {
      setLoading(false);
      setError("Missing or invalid userId.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/chat/threads/${resolvedUserId}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load thread");
      }
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const send = async () => {
    if (!body.trim() || !isValidUserId) {
      return;
    }

    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientId: resolvedUserId, body }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message");
      }
      setBody("");
      await loadThread();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    setError(null);
    if (!isValidUserId) {
      setLoading(false);
      setMessages([]);
      return;
    }

    loadThread();

    const supabase = createClient();
    const channel = supabase
      .channel(`messages-${resolvedUserId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        () => loadThread()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [resolvedUserId, isValidUserId]);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
          <p className="text-sm text-zinc-500">
            Messages are ordered oldest to newest.
          </p>
        </div>
        <button
          onClick={loadThread}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          disabled={loading || !isValidUserId}
        >
          Refresh
        </button>
      </div>

      <div className="flex-1 overflow-auto rounded-lg border border-zinc-200 bg-white p-4">
        {loading ? (
          <p className="text-sm text-zinc-500">Loading thread…</p>
        ) : messages.length === 0 ? (
          <p className="text-sm text-zinc-500">No messages yet.</p>
        ) : (
          <ul className="space-y-3">
            {messages.map((message) => (
              <li
                key={message.id}
                className="rounded-lg border border-zinc-100 bg-zinc-50 p-3"
              >
                <p className="text-sm text-zinc-800">{message.body}</p>
                <p className="mt-2 text-xs text-zinc-500">
                  {new Date(message.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isValidUserId ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          Missing or invalid userId. Open /chat and enter a valid user UUID.
        </div>
      ) : error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="flex items-center gap-2">
        <input
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Type a message…"
          className="flex-1 rounded-md border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          disabled={!isValidUserId}
        />
        <button
          onClick={send}
          disabled={sending || !isValidUserId}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send"}
        </button>
      </div>
    </div>
  );
}