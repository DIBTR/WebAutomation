import { Page, test } from '@playwright/test';

export default async ({ page, label }: { page: Page; label: string }): Promise<void> => {
  await test.step(`Clicking ${label} button`, async () => {
    await page.locator('button', { hasText: label }).click();
  });
};
