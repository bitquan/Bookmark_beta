export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-zinc-900">Bookmark</h1>
          <p className="text-base text-zinc-600">
            Social learning, progress tracking, and real‑time chat.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          <a
            href="/feed"
            className="rounded-xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow"
          >
            <h2 className="text-lg font-semibold text-zinc-900">Social Feed</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Post updates and follow other learners.
            </p>
          </a>
          <a
            href="/dashboard"
            className="rounded-xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow"
          >
            <h2 className="text-lg font-semibold text-zinc-900">Progress Dashboard</h2>
            <p className="mt-2 text-sm text-zinc-500">
              View learning stats and trends.
            </p>
          </a>
          <a
            href="/chat"
            className="rounded-xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow"
          >
            <h2 className="text-lg font-semibold text-zinc-900">Chat</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Open a direct message thread by user ID.
            </p>
          </a>
          <a
            href="/login"
            className="rounded-xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow"
          >
            <h2 className="text-lg font-semibold text-zinc-900">Login</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Sign in to use chat and notifications.
            </p>
          </a>
          <a
            href="/notifications"
            className="rounded-xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow"
          >
            <h2 className="text-lg font-semibold text-zinc-900">Notifications</h2>
            <p className="mt-2 text-sm text-zinc-500">
              View recent activity updates.
            </p>
          </a>
        </section>
      </main>
    </div>
  );
}
