import NotificationsPanel from "@/features/notifications/components/NotificationsPanel";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Inbox
          </p>
          <h1 className="text-3xl font-semibold text-zinc-900">Notifications</h1>
          <p className="text-sm text-zinc-500">
            Keep up with new messages, follows, and comments.
          </p>
        </header>
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <NotificationsPanel />
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900">Notification tips</h2>
              <p className="mt-2 text-sm text-zinc-500">
                Keep notifications tidy with quick actions.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                <li className="flex items-center justify-between">
                  <span>Mark all read</span>
                  <span className="text-xs text-zinc-400">Daily</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Review follows</span>
                  <span className="text-xs text-zinc-400">Weekly</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Reply to comments</span>
                  <span className="text-xs text-zinc-400">48h window</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900">Delivery</h2>
              <p className="mt-2 text-sm text-zinc-500">
                All notifications are synced in real time.
              </p>
              <div className="mt-4 rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-500">
                Tip: Keep this tab open to see live updates.
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                <span>Push enabled</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-600">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}