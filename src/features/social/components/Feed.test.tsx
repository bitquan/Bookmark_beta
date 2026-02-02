import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Feed from "./Feed";

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  // Initial load
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  vi.stubGlobal("fetch", mockFetch);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Feed", () => {
  it("creates a post when content is provided", async () => {
    render(<Feed />);

    await screen.findByText(/no posts yet/i);

    await userEvent.type(
      screen.getByPlaceholderText(/share an update/i),
      "Hello world"
    );

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "post-1" }),
    });

    // Reload after create
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await userEvent.click(screen.getByRole("button", { name: /post/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/social/posts", expect.any(Object));
    });
  });
});
