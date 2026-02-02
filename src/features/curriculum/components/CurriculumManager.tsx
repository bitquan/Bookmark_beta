"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

type CurriculumItem = {
  id: string;
  title: string;
  item_type: string;
  status: string;
  tags: string[];
  created_at: string;
};

type BookResult = {
  externalId: string;
  title: string;
  author: string | null;
  coverUrl: string | null;
  year: number | null;
};

export default function CurriculumManager() {
  const [items, setItems] = useState<CurriculumItem[]>([]);
  const [title, setTitle] = useState("");
  const [itemType, setItemType] = useState("book");
  const [status, setStatus] = useState("planned");
  const [tags, setTags] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [noticeType, setNoticeType] = useState<"success" | "error" | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [bookQuery, setBookQuery] = useState("");
  const [bookResults, setBookResults] = useState<BookResult[]>([]);
  const [bookLoading, setBookLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    setNotice(null);
    setNoticeType(null);
    try {
      const res = await fetch("/api/curriculum", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load curriculum");
      }
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const create = async () => {
    setError(null);
    setNotice(null);
    setNoticeType(null);
    try {
      const res = await fetch("/api/curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          itemType,
          status,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to create item");
      }
      setTitle("");
      setTags("");
      await load();
      setNotice("Item added.");
      setNoticeType("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setNoticeType("error");
    }
  };

  const remove = async (id: string) => {
    setError(null);
    setNotice(null);
    setNoticeType(null);
    try {
      const res = await fetch(`/api/curriculum/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to delete item");
      }
      await load();
      setNotice("Item deleted.");
      setNoticeType("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setNoticeType("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const searchBooks = async () => {
    if (!bookQuery.trim()) return;
    setBookLoading(true);
    setError(null);
    setNotice(null);
    setNoticeType(null);
    try {
      const res = await fetch(`/api/books/search?q=${encodeURIComponent(bookQuery)}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to search books");
      }
      setBookResults(data);
      setNotice(data.length ? "Book results loaded." : "No books found.");
      setNoticeType("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setNoticeType("error");
    } finally {
      setBookLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-zinc-900">Curriculum Builder</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Add learning items and track their status.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2 rounded-lg border border-zinc-100 bg-zinc-50 p-4">
            <h2 className="text-sm font-semibold text-zinc-900">Book search</h2>
            <p className="mt-1 text-xs text-zinc-500">
              Search Open Library and click a result to populate the title.
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                value={bookQuery}
                onChange={(event) => setBookQuery(event.target.value)}
                className="flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                placeholder="Search books"
              />
              <Button variant="secondary" onClick={searchBooks}>
                {bookLoading ? "Searching…" : "Search"}
              </Button>
            </div>
            {bookResults.length ? (
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {bookResults.map((book) => (
                  <button
                    key={book.externalId}
                    type="button"
                    onClick={() => {
                      setTitle(book.title);
                      setItemType("book");
                    }}
                    className="flex items-center justify-between gap-3 rounded-md border border-zinc-200 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:bg-zinc-50 hover:shadow"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-900">{book.title}</p>
                      <p className="text-xs text-zinc-500">
                        {book.author ?? "Unknown author"}
                        {book.year ? ` · ${book.year}` : ""}
                      </p>
                    </div>
                    <div className="h-12 w-8 rounded bg-zinc-100" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-zinc-700">Title</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="Learn React Server Components"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">Type</label>
            <input
              value={itemType}
              onChange={(event) => setItemType(event.target.value)}
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="book, course, article"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">Status</label>
            <input
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="planned, in-progress, done"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-zinc-700">Tags</label>
            <input
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="react, nextjs, ui"
            />
          </div>
          <div className="sm:col-span-2">
            <Button onClick={create} className="w-full">
              Add item
            </Button>
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
        <div className="space-y-3">
          <div className="h-16 w-full animate-pulse rounded-xl bg-zinc-100" />
          <div className="h-16 w-full animate-pulse rounded-xl bg-zinc-100" />
          <div className="h-16 w-full animate-pulse rounded-xl bg-zinc-100" />
        </div>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-6 text-sm text-zinc-500">
          No items yet. Add your first learning item to get started.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-sm font-semibold text-zinc-600">
                    {item.item_type.slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-zinc-900">
                      {item.title}
                    </h2>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5">
                        {item.item_type}
                      </span>
                      <Badge
                        variant={
                          item.status === "done"
                            ? "success"
                            : item.status === "in-progress"
                            ? "warning"
                            : "muted"
                        }
                      >
                        {item.status}
                      </Badge>
                      <span className="text-xs text-zinc-400">
                        Added {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden h-14 w-16 rounded-lg bg-zinc-100 sm:block" />
                  <Button
                    variant="danger"
                    onClick={() => remove(item.id)}
                    className="px-3 py-1 text-xs"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-100">
                <div
                  className={`h-1.5 rounded-full ${
                    item.status === "done"
                      ? "w-full bg-emerald-500"
                      : item.status === "in-progress"
                      ? "w-1/2 bg-zinc-900"
                      : "w-1/4 bg-zinc-300"
                  }`}
                />
              </div>
              {item.tags?.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}