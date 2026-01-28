import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',

  workers: isCI ? 2 : 4,
  retries: isCI ? 1 : 0,
  timeout: 30 * 1000,

  use: {
    headless: true,
    baseURL: process.env.BASE_URL,              
    screenshot: 'only-on-failure',
    video: isCI ? 'retain-on-failure' : 'off',  
    trace: 'on-first-retry',
  },

  // Adding JUnit for Azure DevOps + keep HTML report
  reporter: [
    ['list'],
    ['html', { open: isCI ? 'never' : 'on-failure' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

 outputDir: 'test-results',
});
