"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
};

export default function ProfileForm() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const load = async () => {
    setLoading(true);
    setMessage(null);
    setMessageType(null);
    try {
      const res = await fetch("/api/profile", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load profile");
      }
      setProfile(data);
      setFullName(data.full_name ?? "");
      setUsername(data.username ?? "");
      setBio(data.bio ?? "");
      setAvatarUrl(data.avatar_url ?? null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unknown error");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    setMessage(null);
    setMessageType(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName || undefined,
          username: username || undefined,
          bio: bio || undefined,
          avatarUrl: avatarUrl || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to update profile");
      }
      await load();
      setMessage("Profile updated.");
      setMessageType("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unknown error");
      setMessageType("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const uploadAvatar = async (file: File) => {
    if (!profile?.id) return;
    setUploading(true);
    setMessage(null);
    setMessageType(null);
    try {
      const supabase = createClient();
      const path = `${profile.id}/${file.name}`;
      const { error } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });
      if (error) {
        throw error;
      }
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      setAvatarUrl(data.publicUrl);
      await save();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unknown error");
      setMessageType("error");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-zinc-500">Loading profile…</p>;
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-zinc-900">Profile settings</h2>
          <p className="text-sm text-zinc-500">Update your public profile.</p>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          Public
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-zinc-700">Avatar</label>
          <div className="mt-2 flex items-center gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-zinc-100 text-sm font-semibold text-zinc-600 ring-2 ring-white">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Avatar"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                "BM"
              )}
            </div>
            <label htmlFor="profile-avatar" className="sr-only">
              Upload avatar
            </label>
            <input
              id="profile-avatar"
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) uploadAvatar(file);
              }}
              className="text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="profile-fullname" className="text-sm font-medium text-zinc-700">
            Full name
          </label>
          <input
            id="profile-fullname"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>
        <div>
          <label htmlFor="profile-username" className="text-sm font-medium text-zinc-700">
            Username
          </label>
          <input
            id="profile-username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>
        <div>
          <label htmlFor="profile-bio" className="text-sm font-medium text-zinc-700">
            Bio
          </label>
          <textarea
            id="profile-bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            className="mt-2 h-24 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={save} disabled={uploading}>
            {uploading ? "Uploading…" : "Save changes"}
          </Button>
        </div>
        <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-500">
          Keep your username short and consistent across platforms.
        </div>
      </div>

      {profile ? (
        <p className="mt-4 text-xs text-zinc-500">User ID: {profile.id}</p>
      ) : null}

      {message ? (
        <div
          role={messageType === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`mt-4 rounded-md border p-3 text-sm ${
            messageType === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}