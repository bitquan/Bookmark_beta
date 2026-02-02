"use client";

import { useState } from "react";

export default function ProgressForm() {
  const [curriculumItemId, setCurriculumItemId] = useState("");
  const [percentComplete, setPercentComplete] = useState(0);
  const [pagesRead, setPagesRead] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setMessage(null);
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
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-zinc-900">Add progress</h2>
      <p className="mt-2 text-sm text-zinc-500">
        Submit progress for a curriculum item ID.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-zinc-700">
            Curriculum Item ID
          </label>
          <input
            value={curriculumItemId}
            onChange={(event) => setCurriculumItemId(event.target.value)}
            className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="UUID of the curriculum item"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-zinc-700">Percent complete</label>
            <input
              type="number"
              min={0}
              max={100}
              value={percentComplete}
              onChange={(event) => setPercentComplete(Number(event.target.value))}
              className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">Pages read</label>
            <input
              type="number"
              min={0}
              value={pagesRead}
              onChange={(event) => setPagesRead(Number(event.target.value))}
              className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
        </div>
        <button
          onClick={submit}
          disabled={loading || !curriculumItemId}
          className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save progress"}
        </button>
      </div>

      {message ? (
        <div className="mt-4 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
          {message}
        </div>
      ) : null}
    </div>
  );
}