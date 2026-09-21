import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  reporter: [
    ['list', { printSteps: true }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['./reports/summary-reporter.ts'],
  ],
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  use: {
    baseURL: 'https://www.greencity.cx.ua',
    locale: 'en-US',
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    launchOptions: {
      args: [
        '--disable-web-security',
        '--no-sandbox',
        '--ignore-certificate-errors',
      ],
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
});