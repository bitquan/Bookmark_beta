"use client";

import { useEffect, useState } from "react";

type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
};

type Stats = {
  postsCount: number;
  followersCount: number;
  followingCount: number;
};

type Props = {
  userId: string;
};

export default function ProfileCard({ userId }: Props) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/social/profile/${userId}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Failed to load profile");
        }
        setProfile(data.profile);
        setStats(data.stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  if (loading) {
    return <p className="text-sm text-zinc-500">Loading profile…</p>;
  }

  if (error) {
    return (
      <p role="alert" className="text-sm text-red-600">
        {error}
      </p>
    );
  }

  if (!profile || !stats) {
    return <p className="text-sm text-zinc-500">No profile found.</p>;
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div
          className="h-12 w-12 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-100"
          aria-hidden="true"
        />
        <div>
          <h1 className="text-xl font-semibold text-zinc-900">
            {profile.full_name || profile.username || "Unnamed user"}
          </h1>
          <p className="text-xs text-zinc-500">{profile.id}</p>
        </div>
      </div>
      {profile.bio ? (
        <p className="mt-3 text-sm text-zinc-600">{profile.bio}</p>
      ) : null}
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 text-center">
          <p className="text-xs text-zinc-500">Posts</p>
          <p className="text-lg font-semibold text-zinc-900">{stats.postsCount}</p>
        </div>
        <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 text-center">
          <p className="text-xs text-zinc-500">Followers</p>
          <p className="text-lg font-semibold text-zinc-900">{stats.followersCount}</p>
        </div>
        <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 text-center">
          <p className="text-xs text-zinc-500">Following</p>
          <p className="text-lg font-semibold text-zinc-900">{stats.followingCount}</p>
        </div>
      </div>
    </div>
  );
}