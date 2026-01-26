import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',

  // CI-friendly defaults
  workers: isCI ? 2 : 4,
  retries: isCI ? 1 : 0,
  timeout: 30 * 1000,

  // Recommended: keep artifacts in CI for debugging
  use: {
    headless: true,
    baseURL: process.env.BASE_URL,              // set in .env locally, variable in pipeline
    screenshot: 'only-on-failure',
    video: isCI ? 'retain-on-failure' : 'off',  // saves space locally
    trace: 'on-first-retry',
  },

  // Add JUnit for Azure DevOps + keep HTML report
  reporter: [
    ['list'],
    ['html', { open: isCI ? 'never' : 'on-failure' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],

  // (Optional but common) run on Chromium by default; add more later if needed
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // (Optional) put all artifacts here (keeps repo tidy)
  outputDir: 'test-results',
});
