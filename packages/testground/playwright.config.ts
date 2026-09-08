import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.ANYUI_TESTGROUND_E2E_PORT ?? 5174);

export default defineConfig({
  testDir: './e2e',
  outputDir: '../../output/playwright/testground/artifacts',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: '../../output/playwright/testground/report',
        open: 'never',
      },
    ],
  ],
  use: {
    baseURL: `http://127.0.0.1:${port}/testground/`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: `pnpm --filter @any-design/anyui-testground exec vite --host 127.0.0.1 --port ${port} --strictPort`,
    url: `http://127.0.0.1:${port}/testground/`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
