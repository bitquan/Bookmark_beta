"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-start justify-center gap-4 px-6 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        Dashboard error
      </p>
      <h1 className="text-3xl font-semibold text-zinc-900">
        Something broke in your dashboard.
      </h1>
      <p className="text-base text-zinc-600">
        Retry the page, or head back home.
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
  );
}
