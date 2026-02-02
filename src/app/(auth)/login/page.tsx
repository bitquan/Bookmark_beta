import AuthForm from "@/features/auth/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6">
        <AuthForm mode="login" />
      </div>
    </div>
  );
}