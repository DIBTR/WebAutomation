import { test } from '@playwright/test';
import ZephyrReporter from '@utils/ZReporter';

test.describe('@smokeSuite', () => {
  test.afterEach(async ({}, testInfo) => {
    await new ZephyrReporter().updateTestResultInZephyr(testInfo.title, testInfo.status);
  });

  test('[TC-XXX] - Validate console error during end2end test flow @smoke', async ({ page }) => {
    page.on('console', (msg) => {
      if (msg.type() == 'error') {
        console.log(
          `%c❌ Error: Received from browser console =>  Error message text :${msg.text()} , location :: ${JSON.stringify(
            msg.location()
          )}`
        );
      }
    });

    await test.step(`Given the user navigates to the invalid page to generate console error`, async () => {
      await page.goto('https://www.amazon.in/shjgdfh');
    });
  });
});
