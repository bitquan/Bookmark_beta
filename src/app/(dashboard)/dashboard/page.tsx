import ProgressDashboard from "@/features/progress/components/ProgressDashboard";
import ProgressForm from "@/features/progress/components/ProgressForm";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="space-y-8">
          <ProgressDashboard />
          <ProgressForm />
        </div>
      </div>
    </div>
  );
}