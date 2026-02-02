import ChatThreadClient from "@/features/chat/components/ChatThreadClient";

type PageProps = {
  params: Promise<{ userId?: string }>;
};

export default async function ChatThreadPage({ params }: PageProps) {
  const { userId } = await params;

  if (!userId) {
    return (
      <div className="min-h-screen bg-zinc-50 px-6 py-12">
        <div className="mx-auto w-full max-w-3xl rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Missing userId in route. Open /chat and enter a valid user UUID.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <ChatThreadClient userId={userId} />
      </div>
    </div>
  );
}