// @ts-check
import { test, expect } from '@playwright/test';


test.only('Page Playwright test', async ({page})=>
{
  await page.goto("https://google.com");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
  await page.pause();
});