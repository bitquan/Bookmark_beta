import ProfileCard from "@/features/social/components/profile/ProfileCard";

type PageProps = {
  params: Promise<{ userId?: string }>;
};

export default async function ProfilePage({ params }: PageProps) {
  const { userId } = await params;

  if (!userId) {
    return (
      <div className="min-h-screen bg-zinc-50 px-6 py-10">
        <div className="mx-auto w-full max-w-3xl rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Missing userId.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <ProfileCard userId={userId} />
      </div>
    </div>
  );
}