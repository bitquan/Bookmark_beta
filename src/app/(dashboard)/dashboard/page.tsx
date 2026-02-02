import ProgressDashboard from "@/features/progress/components/ProgressDashboard";
import ProgressForm from "@/features/progress/components/ProgressForm";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Analytics
          </p>
          <h1 className="text-3xl font-semibold text-zinc-900">Dashboard</h1>
          <p className="text-sm text-zinc-500">
            Track your learning progress and recent updates.
          </p>
        </header>
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <ProgressDashboard />
          <div className="space-y-6">
            <ProgressForm />
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900">Coach notes</h2>
              <p className="mt-2 text-sm text-zinc-500">
                Keep a steady pace for better retention.
              </p>
              <div className="mt-4 space-y-3 text-sm text-zinc-600">
                <div className="flex items-center justify-between">
                  <span>Weekly goal</span>
                  <span className="text-xs text-zinc-400">5 sessions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Latest review</span>
                  <span className="text-xs text-zinc-400">2 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Focus area</span>
                  <span className="text-xs text-zinc-400">Design systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}