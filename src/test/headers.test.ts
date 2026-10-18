// Checks that the Content-Security-Policy in netlify.toml still allows the inline script in index.html.
import { expect, it } from "vitest";
import indexHtml from "../../index.html?raw";
import netlifyToml from "../../netlify.toml?raw";

it("allows the inline script in index.html by its hash", async () => {
  const script = /<script>([\s\S]*?)<\/script>/.exec(indexHtml)?.[1] ?? "";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(script));
  const hash = btoa(String.fromCharCode(...new Uint8Array(digest)));
  expect(script).not.toBe("");
  expect(netlifyToml).toContain(`'sha256-${hash}'`);
});
