import Feed from "@/features/social/components/Feed";
import FollowPanel from "@/features/social/components/FollowPanel";

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Social
          </p>
          <h1 className="text-3xl font-semibold text-zinc-900">Feed</h1>
          <p className="text-sm text-zinc-500">
            Share updates and connect with other learners.
          </p>
        </header>
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Feed />
          <div className="space-y-6">
            <FollowPanel />
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-zinc-900">
                Community goals
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                Celebrate wins and share milestones.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                <li className="flex items-center justify-between">
                  <span>Weekly reading sprint</span>
                  <span className="text-xs text-zinc-400">68%</span>
                </li>
                <div className="h-1 w-full rounded-full bg-zinc-100">
                  <div className="h-1 w-2/3 rounded-full bg-zinc-900" />
                </div>
                <li className="flex items-center justify-between">
                  <span>UX research notes</span>
                  <span className="text-xs text-zinc-400">43%</span>
                </li>
                <div className="h-1 w-full rounded-full bg-zinc-100">
                  <div className="h-1 w-2/5 rounded-full bg-emerald-500" />
                </div>
                <li className="flex items-center justify-between">
                  <span>Case study review</span>
                  <span className="text-xs text-zinc-400">81%</span>
                </li>
                <div className="h-1 w-full rounded-full bg-zinc-100">
                  <div className="h-1 w-4/5 rounded-full bg-zinc-900" />
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}