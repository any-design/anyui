import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.ANYUI_WEBSITE_E2E_PORT || 4325);
export default defineConfig({
  testDir: './e2e',
  outputDir: '../../output/playwright/website/artifacts',
  fullyParallel: true,
  workers: 3,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: '../../output/playwright/website/report', open: 'never' }],
  ],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `pnpm --filter @any-design/anyui-website exec astro preview --ignore-lock --host 127.0.0.1 --port ${port}`,
    // Keep the preview attached to Playwright, including agent environments
    // where Astro otherwise starts a detached background process.
    env: { ASTRO_PREVIEW_BACKGROUND: '1' },
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 1000 } },
    },
  ],
});
