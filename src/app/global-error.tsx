"use client";

import Link from "next/link";
import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-start justify-center gap-4 px-6 py-12">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Server error
          </p>
          <h1 className="text-3xl font-semibold text-zinc-900">
            Something went wrong on our end.
          </h1>
          <p className="text-base text-zinc-600">
            Try again or return home.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Try again
            </button>
            <Link
              href="/"
              className="rounded border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400 hover:text-zinc-900"
            >
              Back home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
