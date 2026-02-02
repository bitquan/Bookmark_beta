import ProfileForm from "@/features/auth/components/ProfileForm";

export default function ProfileSettingsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Settings
          </p>
          <h1 className="text-3xl font-semibold text-zinc-900">Profile</h1>
          <p className="text-sm text-zinc-500">
            Manage your public profile and avatar.
          </p>
        </header>
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <ProfileForm />
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900">Profile checklist</h2>
              <p className="mt-2 text-sm text-zinc-500">
                Complete your profile to build trust.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                <li className="flex items-center justify-between">
                  <span>Upload avatar</span>
                  <span className="text-xs text-zinc-400">Optional</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Add a short bio</span>
                  <span className="text-xs text-zinc-400">Recommended</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Pick a username</span>
                  <span className="text-xs text-zinc-400">Required</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900">Visibility</h2>
              <p className="mt-2 text-sm text-zinc-500">
                Your profile appears on posts and in search.
              </p>
              <div className="mt-4 rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-500">
                Tip: Add a clear bio so others can find you.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}