import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ProgressForm from "./ProgressForm";

describe("ProgressForm", () => {
  it("requires a curriculum item id before submitting", async () => {
    render(<ProgressForm />);

    const button = screen.getByRole("button", { name: /save progress/i });
    expect(button).toBeDisabled();

    await userEvent.type(
      screen.getByLabelText(/curriculum item id/i),
      "123"
    );

    expect(button).toBeEnabled();
  });
});
