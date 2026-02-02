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
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Progress Dashboard</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Track your learning progress over time.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500">Loading dashboard…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : data ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <p className="text-sm text-zinc-500">Items tracked</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-900">
              {data.totals.totalItems}
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <p className="text-sm text-zinc-500">Total pages read</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-900">
              {data.totals.totalPagesRead}
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <p className="text-sm text-zinc-500">Average completion</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-900">
              {data.totals.avgPercent}%
            </p>
          </div>
          <div className="lg:col-span-3 rounded-xl border border-zinc-200 bg-white p-6">
            {chartData ? (
              <Line data={chartData} />
            ) : (
              <p className="text-sm text-zinc-500">No chart data yet.</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}