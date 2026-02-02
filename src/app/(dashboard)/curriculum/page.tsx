import CurriculumManager from "@/features/curriculum/components/CurriculumManager";

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900">Curriculum</h1>
            <p className="mt-2 text-sm text-zinc-500">
              Organize books, courses, and learning goals.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                Active items
              </p>
              <p className="mt-2 text-2xl font-semibold text-zinc-900">12</p>
              <p className="text-xs text-zinc-500">Across 4 topics</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                Completed
              </p>
              <p className="mt-2 text-2xl font-semibold text-zinc-900">4</p>
              <p className="text-xs text-zinc-500">This month</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                Focus tag
              </p>
              <p className="mt-2 text-2xl font-semibold text-zinc-900">
                Design systems
              </p>
              <p className="text-xs text-zinc-500">Top priority</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
              <input
                type="text"
                placeholder="Search topics, books, or tags"
                className="w-full bg-transparent text-sm focus:outline-none"
              />
            </div>
            <div className="inline-flex rounded-full border border-zinc-200 bg-white p-1 text-xs shadow-sm">
              <button className="rounded-full bg-zinc-900 px-3 py-1 text-white shadow">
                Top topics
              </button>
              <button className="rounded-full px-3 py-1 text-zinc-600 hover:text-zinc-900">
                To learn
              </button>
              <button className="rounded-full px-3 py-1 text-zinc-600 hover:text-zinc-900">
                Completed
              </button>
            </div>
          </div>
        </header>
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <CurriculumManager />
            </div>
            <div className="space-y-6">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-zinc-900">Top topics</h3>
                  <span className="text-xs text-zinc-400">Trending</span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-zinc-100 px-3 py-3 transition hover:bg-zinc-50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
                        AI
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900">Artificial Intelligence</p>
                        <p className="text-xs text-zinc-500">Best with math basics</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-400">4 items</span>
                      <div className="h-10 w-12 rounded-lg bg-zinc-100" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-zinc-100 px-3 py-3 transition hover:bg-zinc-50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
                        HI
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900">History</p>
                        <p className="text-xs text-zinc-500">Revisit core readings</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-400">3 items</span>
                      <div className="h-10 w-12 rounded-lg bg-zinc-100" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-zinc-100 px-3 py-3 transition hover:bg-zinc-50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
                        PH
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900">Philosophy</p>
                        <p className="text-xs text-zinc-500">Socratic primer</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-400">2 items</span>
                      <div className="h-10 w-12 rounded-lg bg-zinc-100" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-zinc-900">Recommended for you</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Curated from your recent topics.
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
          </div>
      </div>
    </div>
  );
}