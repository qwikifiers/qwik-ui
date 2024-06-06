import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:5173';

const dirName = dirname(__filename);

const currentPlatform = os.platform();

let binaryPath;

switch (currentPlatform) {
  case 'darwin':
    binaryPath =
      './browsers/chrome/108/chrome-darwin/Chromium.app/Contents/MacOS/Chromium';
    break;
  case 'win32':
    binaryPath = './browsers/chrome/108/chrome-win32/chrome.exe';
    break;
  case 'linux':
    binaryPath = './browsers/chrome/108/chrome-linux/chrome';
    break;
  default:
    throw new Error('Cannot install Chrome 108 on unknown platform');
}

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  testMatch: '**/*.test.ts',
  timeout: 30000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm dev.ct',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
    timeout: 120000,
  },
  projects: [
    {
      name: 'logic',
      use: { ...devices['Desktop Chrome'] },
      grepInvert: /@Visual.*/,
    },

    {
      name: 'popover-chrome-108',
      use: {
        launchOptions: {
          executablePath: path.resolve(dirName, binaryPath),
        },
      },
      grep: /popover/,
    },

    {
      name: 'visual',
      use: { ...devices['Desktop Chrome'] },
      grep: /@Visual.*/,
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // Uncomment for mobile browsers support
    /* {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, */

    // Uncomment for branded browsers
    /* {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    } */
  ],
});
