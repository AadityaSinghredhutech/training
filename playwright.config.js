// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  timeout: 40 * 1000,

  reporter: 'html',

  use: {
    browserName: 'firefox',
    headless: false,
    screenshot : 'on',
    trace : 'on',
  },

});