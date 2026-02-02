import NotificationsPanel from "@/features/notifications/components/NotificationsPanel";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <NotificationsPanel />
      </div>
    </div>
  );
}