import { expect, test } from '@playwright/test';
import ZephyrReporter from '@utils/ZReporter';

test.describe('@smokeSuite', () => {
  test.afterEach(async ({}, testInfo) => {
    await new ZephyrReporter().updateTestResultInZephyr(testInfo.title, testInfo.status);
  });

  test('[TC-XXX] - Mock api response and validate Inventory out of stock message @smoke', async ({ page }) => {
    await test.step(`Given the user navigates to application home page`, async () => {
      await page.goto('https://demo.playwright.dev/api-mocking');
    });
    
    await test.step(`Then user should see all Available Fruit options`, async () => {
      await expect(page.getByText('Strawberry')).toBeVisible();
    });

    await test.step(`Mock api response and feed Out of Inventory`, async () => {
      await page.route('*/**/api/v1/fruits', async (route) => {
        const json = [{ name: 'Inventory Out of stock', id: 0 }];
        await route.fulfill({ json });
      });
    });

    await test.step(`Given User navigates to application home page`, async () => {
      await page.goto('https://demo.playwright.dev/api-mocking');
    });

    await test.step(`Then user should see Inventory Out of stock message`, async () => {
      await expect(page.getByText('Out of stock')).toBeVisible();
    });
  });
});
