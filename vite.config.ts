import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    // Browser tests in e2e/ run with Playwright, not Vitest.
    exclude: [...configDefaults.exclude, "e2e/**"],
  },
});
