"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

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
  const [notice, setNotice] = useState<string | null>(null);

  const title = useMemo(
    () => `Chat with ${resolvedUserId ?? ""}`,
    [resolvedUserId]
  );

  const isValidUserId =
    typeof resolvedUserId === "string" &&
    resolvedUserId.length > 0 &&
    resolvedUserId !== "undefined";

  const loadThread = useCallback(async () => {
    if (!isValidUserId) {
      setLoading(false);
      setError("Missing or invalid userId.");
      return;
    }

    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch(`/api/chat/threads/${resolvedUserId}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load thread");
      }
      setMessages(data);
      setNotice(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [isValidUserId, resolvedUserId]);

  const send = async () => {
    if (!body.trim() || !isValidUserId) {
      return;
    }

    setSending(true);
    setError(null);
    setNotice(null);
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
      setNotice("Message sent.");
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
  }, [resolvedUserId, isValidUserId, loadThread]);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link
              href="/chat"
              className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50"
            >
              Back
            </Link>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-600">
              {resolvedUserId?.slice(0, 2)?.toUpperCase() || "CH"}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
              <p className="text-sm text-zinc-500">
                Messages are ordered oldest to newest.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="px-3 py-1 text-xs">
              Call
            </Button>
            <Button variant="ghost" className="px-3 py-1 text-xs">
              Video
            </Button>
            <Button
              variant="secondary"
              onClick={loadThread}
              disabled={loading || !isValidUserId}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div
        className="flex-1 overflow-auto rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
        aria-live="polite"
      >
        {loading ? (
          <div className="space-y-3">
            <div className="h-12 w-2/3 animate-pulse rounded-2xl bg-zinc-100" />
            <div className="ml-auto h-12 w-1/2 animate-pulse rounded-2xl bg-zinc-100" />
            <div className="h-12 w-3/4 animate-pulse rounded-2xl bg-zinc-100" />
          </div>
        ) : messages.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-500">
            No messages yet. Say hello to start the conversation.
          </div>
        ) : (
          <ul className="space-y-4">
            {messages.map((message) => {
              const fromOther = message.sender_id === resolvedUserId;
              return (
                <li
                  key={message.id}
                  className={`flex ${fromOther ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-3xl border px-4 py-3 text-sm shadow-sm ${
                      fromOther
                        ? "border-zinc-200 bg-zinc-50 text-zinc-800"
                        : "border-zinc-900 bg-zinc-900 text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span
                        className={`rounded-full px-2 py-1 ${
                          fromOther
                            ? "bg-white text-zinc-500"
                            : "bg-white/10 text-white/80"
                        }`}
                      >
                        {fromOther ? "Them" : "You"}
                      </span>
                      <span className={fromOther ? "text-zinc-400" : "text-white/70"}>
                        {new Date(message.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed">{message.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {!isValidUserId ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          Missing or invalid userId. Open /chat and enter a valid user UUID.
        </div>
      ) : error ? (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </div>
      ) : notice ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700"
        >
          {notice}
        </div>
      ) : null}

      <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="px-3 py-2 text-xs">
            +
          </Button>
          <input
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Type a message…"
            className="flex-1 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            disabled={!isValidUserId}
          />
          <Button onClick={send} disabled={sending || !isValidUserId}>
            {sending ? "Sending…" : "Send"}
          </Button>
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          Tip: Press Enter to send once keyboard support is added.
        </p>
      </div>
    </div>
  );
}