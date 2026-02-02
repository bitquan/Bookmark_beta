import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-start justify-center gap-4 px-6 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        404 error
      </p>
      <h1 className="text-3xl font-semibold text-zinc-900">
        We couldn’t find that page.
      </h1>
      <p className="text-base text-zinc-600">
        Check the URL or head back to the dashboard to keep learning.
      </p>
      <Link
        href="/"
        className="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Back to home
      </Link>
    </div>
  );
}
