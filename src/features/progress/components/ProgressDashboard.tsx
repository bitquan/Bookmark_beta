"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

type DashboardData = {
  totals: { totalItems: number; totalPagesRead: number; avgPercent: number };
  recent: Array<{ date: string; percent: number }>;
};

export default function ProgressDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/progress/dashboard", { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json?.error || "Failed to load dashboard");
        }
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const chartData = useMemo(() => {
    if (!data) return null;
    const labels = [...data.recent].reverse().map((row) =>
      new Date(row.date).toLocaleDateString()
    );
    const values = [...data.recent].reverse().map((row) => row.percent);
    return {
      labels,
      datasets: [
        {
          label: "Percent Complete",
          data: values,
          borderColor: "#18181b",
          backgroundColor: "rgba(24,24,27,0.15)",
          tension: 0.3,
        },
      ],
    };
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">Progress Dashboard</h1>
            <p className="mt-2 text-sm text-zinc-500">
              Track your learning progress over time.
            </p>
          </div>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
            Last 30 days
          </span>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-28 animate-pulse rounded-xl bg-zinc-100" />
          <div className="h-28 animate-pulse rounded-xl bg-zinc-100" />
          <div className="h-28 animate-pulse rounded-xl bg-zinc-100" />
          <div className="lg:col-span-3 h-64 animate-pulse rounded-xl bg-zinc-100" />
        </div>
      ) : error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : data ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Items tracked
            </p>
            <p className="mt-2 text-3xl font-semibold text-zinc-900">
              {data.totals.totalItems}
            </p>
            <p className="mt-2 text-xs text-zinc-500">Across active curriculum</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Pages read
            </p>
            <p className="mt-2 text-3xl font-semibold text-zinc-900">
              {data.totals.totalPagesRead}
            </p>
            <p className="mt-2 text-xs text-zinc-500">Total lifetime</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Avg completion
            </p>
            <p className="mt-2 text-3xl font-semibold text-zinc-900">
              {data.totals.avgPercent}%
            </p>
            <p className="mt-2 text-xs text-zinc-500">Rolling 4 weeks</p>
          </div>
          <div className="lg:col-span-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">Progress trend</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Weekly completion average.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                  +8% this month
                </span>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                  Goal 75%
                </span>
              </div>
            </div>
            <div className="mt-6">
              {chartData ? (
                <Line data={chartData} />
              ) : (
                <p className="text-sm text-zinc-500">No chart data yet.</p>
              )}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-zinc-900" />
                Completion rate
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Goal target
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}