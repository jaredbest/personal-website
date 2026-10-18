// Loads every page and checks the layout fits the screen and axe finds no accessibility problems, in day and night mode.
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { posts } from "../src/data/posts";

const pages = [
  "/",
  "/about",
  "/resume",
  "/projects",
  "/blog",
  ...posts.map((post) => `/blog/${post.id}/${post.slug}`),
  "/legal",
  "/contact",
  "/does-not-exist",
];

async function open(page: Page, path: string, mode: "day" | "night") {
  // Skip the power-on fade so axe sees the final colours.
  await page.addInitScript((mode) => {
    sessionStorage.setItem("booted", "1");
    localStorage.setItem("theme", mode);
  }, mode);
  await page.goto(path);
  await page.waitForLoadState("networkidle");
}

for (const path of pages) {
  test.describe(path, () => {
    test("fits the screen", async ({ page }) => {
      await open(page, path, "night");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, "page is wider than the screen").toBeLessThanOrEqual(0);

      // Each switch in the top bar stays on one row.
      for (const group of await page.locator("header").first().getByRole("group").all()) {
        const tops = await group.getByRole("button").evaluateAll((buttons) => buttons.map((b) => b.getBoundingClientRect().top));
        expect(new Set(tops).size, `${await group.getAttribute("aria-label")} wraps`).toBe(1);
      }
    });

    for (const mode of ["night", "day"] as const) {
      test(`has no accessibility problems in ${mode} mode`, async ({ page }) => {
        await open(page, path, mode);
        const { violations } = await new AxeBuilder({ page })
          // Card previews are pictures of other apps, hidden from screen readers; their text is decorative.
          .exclude('[aria-hidden="true"]')
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        const found = violations.map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(" ")).join(", ")})`);
        expect(found).toEqual([]);
      });
    }
  });
}
