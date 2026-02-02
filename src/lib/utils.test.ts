import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges tailwind classes", () => {
    expect(cn("text-sm", "text-lg", "px-2")).toBe("text-lg px-2");
  });

  it("skips falsy values", () => {
    expect(cn("px-2", false && "hidden")).toBe("px-2");
  });
});
