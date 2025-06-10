import { test, expect } from "@playwright/test";

test("logs are created", async ({ page }) => {
  await page.goto("http://localhost:4000/");
  // Check if there is at least one button on the page
  const button = page.getByRole("button");
  await button.click()
  await expect(button).toBeVisible();
});
