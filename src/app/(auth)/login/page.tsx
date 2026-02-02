import AuthForm from "@/features/auth/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6">
        <header className="text-center">
          <h1 className="text-3xl font-semibold text-zinc-900">Welcome back</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Log in to access chat, notifications, and your dashboard.
          </p>
        </header>
        <AuthForm mode="login" />
        <a href="/signup" className="text-sm text-zinc-600 hover:text-zinc-900">
          Need an account? Sign up
        </a>
      </div>
    </div>
  );
}