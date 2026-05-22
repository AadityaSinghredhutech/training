// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  timeout : 40 * 1000, 
  
  use: {
    browserName : 'firefox',
    headless : false
  },

  
});

