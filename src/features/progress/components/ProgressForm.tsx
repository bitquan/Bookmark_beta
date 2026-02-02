"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ProgressForm() {
  const [curriculumItemId, setCurriculumItemId] = useState("");
  const [percentComplete, setPercentComplete] = useState(0);
  const [pagesRead, setPagesRead] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const submit = async () => {
    setLoading(true);
    setMessage(null);
    setMessageType(null);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          curriculumItemId,
          percentComplete: Number(percentComplete),
          pagesRead: Number(pagesRead),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to save progress");
      }
      setMessage("Progress saved.");
      setMessageType("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unknown error");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Add progress</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Submit progress for a curriculum item ID.
          </p>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          Weekly update
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="progress-curriculum-id"
            className="text-sm font-medium text-zinc-700"
          >
            Curriculum Item ID
          </label>
          <input
            id="progress-curriculum-id"
            value={curriculumItemId}
            onChange={(event) => setCurriculumItemId(event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="UUID of the curriculum item"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="progress-percent"
              className="text-sm font-medium text-zinc-700"
            >
              Percent complete
            </label>
            <input
              id="progress-percent"
              type="number"
              min={0}
              max={100}
              value={percentComplete}
              onChange={(event) => setPercentComplete(Number(event.target.value))}
              className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <div>
            <label
              htmlFor="progress-pages"
              className="text-sm font-medium text-zinc-700"
            >
              Pages read
            </label>
            <input
              id="progress-pages"
              type="number"
              min={0}
              value={pagesRead}
              onChange={(event) => setPagesRead(Number(event.target.value))}
              className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
        </div>
        <Button
          onClick={submit}
          disabled={loading || !curriculumItemId}
          className="w-full"
        >
          {loading ? "Saving…" : "Save progress"}
        </Button>
        <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-500">
          Tip: Log progress weekly to keep the dashboard trend accurate.
        </div>
      </div>

      {message ? (
        <div
          role={messageType === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`mt-4 rounded-md border p-3 text-sm ${
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