export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col gap-6 px-6 py-12">
      <div className="h-6 w-48 animate-pulse rounded bg-zinc-200" />
      <div className="h-10 w-96 animate-pulse rounded bg-zinc-200" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-40 animate-pulse rounded bg-zinc-200" />
        <div className="h-40 animate-pulse rounded bg-zinc-200" />
      </div>
    </div>
  );
}
