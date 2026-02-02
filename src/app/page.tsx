import Link from "next/link";
import HomeActivity from "@/features/social/components/HomeActivity";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">
              Beta · Social Learning
            </span>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                Bookmark
              </h1>
              <p className="text-base leading-relaxed text-zinc-600">
                Social learning, progress tracking, curriculum planning, and real‑time
                conversations in one place.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Get started
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-300 hover:text-zinc-900"
              >
                View dashboard
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                  Weekly focus
                </p>
                <p className="mt-2 text-lg font-semibold text-zinc-900">
                  Product design
                </p>
                <p className="text-xs text-zinc-500">3 modules remaining</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                  Progress
                </p>
                <p className="mt-2 text-lg font-semibold text-zinc-900">68%</p>
                <p className="text-xs text-zinc-500">On track this week</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                  Community
                </p>
                <p className="mt-2 text-lg font-semibold text-zinc-900">
                  12 updates
                </p>
                <p className="text-xs text-zinc-500">Live right now</p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Currently learning
                </h3>
                <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
                  Most recent
                </span>
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-14 overflow-hidden rounded-lg bg-zinc-100" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-900">
                      Sapiens
                    </p>
                    <p className="text-xs text-zinc-500">A Brief History of Humankind</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                      <span>★★★★★</span>
                      <span>4.9</span>
                      <span>·</span>
                      <span>62 reviews</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-100">
                      <div className="h-2 w-1/3 rounded-full bg-zinc-900" />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                      <span>12/36 chapters</span>
                      <span>33%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-14 overflow-hidden rounded-lg bg-zinc-100" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-900">
                      Deep Work
                    </p>
                    <p className="text-xs text-zinc-500">Cal Newport</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                      <span>★★★★☆</span>
                      <span>4.6</span>
                      <span>·</span>
                      <span>28 reviews</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-100">
                      <div className="h-2 w-2/3 rounded-full bg-emerald-500" />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                      <span>8/12 chapters</span>
                      <span>67%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">Activity</h2>
              <p className="text-sm text-zinc-500">What’s happening now.</p>
            </div>
            <HomeActivity />
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900">Quick links</h3>
                <span className="text-xs text-zinc-400">Shortcuts</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">
                Jump into core workflows.
              </p>
              <div className="mt-4 grid gap-3">
                <Link
                  href="/curriculum"
                  className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Plan curriculum
                  <span className="text-xs text-zinc-400">12 items</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  View progress
                  <span className="text-xs text-zinc-400">68%</span>
                </Link>
                <Link
                  href="/chat"
                  className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Start a chat
                  <span className="text-xs text-zinc-400">3 new</span>
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-zinc-900">Recommended</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Based on your recent topics.
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-100 px-3 py-3 transition hover:bg-zinc-50">
                  <div className="h-10 w-10 rounded-full bg-zinc-100" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">Samantha B.</p>
                    <p className="text-xs text-zinc-500">Data Science Enthusiast</p>
                  </div>
                  <button className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50">
                    Follow
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-100 px-3 py-3 transition hover:bg-zinc-50">
                  <div className="h-10 w-10 rounded-full bg-zinc-100" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">Brian L.</p>
                    <p className="text-xs text-zinc-500">Astronomy Buff</p>
                  </div>
                  <button className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
