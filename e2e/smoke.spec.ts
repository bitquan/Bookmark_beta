import { expect, test } from "@playwright/test";

test.describe("smoke", () => {
  test("home loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Bookmark/i);
    await expect(
      page
        .getByRole("banner")
        .getByRole("link", { name: "Dashboard", exact: true })
    ).toBeVisible();
  });

  test("feed page renders", async ({ page }) => {
    await page.goto("/feed");
    await expect(page.getByRole("heading", { name: /feed/i })).toBeVisible();
  });

  test("curriculum page renders", async ({ page }) => {
    await page.goto("/curriculum");
    await expect(
      page.getByRole("heading", { name: /curriculum builder/i })
    ).toBeVisible();
  });

  test("dashboard page renders", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(
      page.getByRole("heading", { name: /progress dashboard/i })
    ).toBeVisible();
  });

  test("auth pages render", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /log in/i })).toBeVisible();
    await page.goto("/signup");
    await expect(page.getByRole("heading", { name: /sign up/i })).toBeVisible();
  });
});
