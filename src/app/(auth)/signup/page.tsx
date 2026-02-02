import AuthForm from "@/features/auth/components/AuthForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6">
        <header className="text-center">
          <h1 className="text-3xl font-semibold text-zinc-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Sign up to start tracking learning progress.
          </p>
        </header>
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}