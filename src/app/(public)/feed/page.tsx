import Feed from "@/features/social/components/Feed";
import FollowPanel from "@/features/social/components/FollowPanel";

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <Feed />
        <FollowPanel />
      </div>
    </div>
  );
}