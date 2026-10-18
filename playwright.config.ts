// Browser tests: every page in Chromium and WebKit (Safari's engine), on a phone and a desktop screen.
import { defineConfig, devices } from "@playwright/test";

const phone = { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true };
const desktop = { viewport: { width: 1280, height: 800 } };

export default defineConfig({
  testDir: "e2e",
  forbidOnly: true,
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:4173",
    reducedMotion: "reduce",
  },
  projects: [
    { name: "chromium-phone", use: { ...devices["Desktop Chrome"], ...phone } },
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"], ...desktop } },
    { name: "webkit-phone", use: { ...devices["Desktop Safari"], ...phone } },
    { name: "webkit-desktop", use: { ...devices["Desktop Safari"], ...desktop } },
  ],
  // Serves the build from `npm run build`.
  webServer: {
    command: "npx vite preview --port 4173 --strictPort",
    url: "http://localhost:4173",
    reuseExistingServer: true,
  },
});
