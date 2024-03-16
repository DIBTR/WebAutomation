import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { browserStackConfig, caps, localConfig } from './browserstack.config';
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.REPORT_PORTAL_API_KEY; // please keep api key in .env file or set it as environment variable.
const REPORT_TYPE = process.env.REPORT_TYPE || '';
const LOG_RESULT_TO_REPORT_PORTAL = process.env.LOG_RESULT_TO_REPORT_PORTAL || 'false';
const RUN_ON_BROWSERSTACK = process.env.RUN_ON_BROWSERSTACK || 'false';

const rpConfig = {
  apiKey: apiKey,
  endpoint: 'http://34.107.186.225/api/v1',
  project: 'default_personal',
  launch: `Automation Run ${new Date().toLocaleDateString()}`,
  restClientConfig: {
    timeout: 0,
  },
  includeTestSteps: true,
  skippedIssue: false,
};

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  /* Maximum time one test can run for. */
  timeout: 1000 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 40000,
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 5 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:
    LOG_RESULT_TO_REPORT_PORTAL === 'true'
      ? [
          ['@reportportal/agent-js-playwright', rpConfig],
          ['list'],
          ['html', { outputFolder: `playwright-report/${REPORT_TYPE}`, open: 'never' }],
        ]
      : [['list'], ['html', { outputFolder: `playwright-report/${REPORT_TYPE}`, open: 'never' }]],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    viewport: null,
    trace: 'off',
    headless: !!process.env.CI,
    screenshot: 'only-on-failure',
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 50000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',
    testIdAttribute: 'testid',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: process.env.ENV_EXECUTION === 'develop' ? 'Develop' : 'Dev',
      use: {
        channel: 'chrome',
        launchOptions: {
          headless: process.env.CI == 'true' ? true : false,
          slowMo: 100,
        },
        trace: 'off',
        video: {
          mode: 'off',
          size: { width: 1680, height: 800 },
        },
      },
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

if (RUN_ON_BROWSERSTACK === 'true') {
  console.log(`User selected execution platform Browserstack`);
  module.exports = process.env.RUN_ON_BROWSERSTACK === 'true' ? browserStackConfig : localConfig;
} else {
  console.log(`User selected execution platform Localhost`);
}

export default config;
