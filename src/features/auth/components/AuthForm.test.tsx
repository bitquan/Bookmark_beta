import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AuthForm from "./AuthForm";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
  }),
}));

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({ error: null }),
      signUp: vi.fn().mockResolvedValue({ error: null }),
    },
  }),
}));

describe("AuthForm", () => {
  it("enables submit when email and password are provided", async () => {
    render(<AuthForm mode="login" />);

    const button = screen.getByRole("button", { name: /log in/i });
    expect(button).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/email/i), "me@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "password123");

    expect(button).toBeEnabled();
  });
});
