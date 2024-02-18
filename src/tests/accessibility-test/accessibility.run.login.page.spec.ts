import { expect, test } from '@playwright/test';
import LoginHelper from '@helpers/common/loginHelper';
import ZephyrReporter from '@utils/ZReporter';
import AxeBuilder from '@axe-core/playwright';

test.describe('@smokeSuite', () => {
  test.afterEach(async ({}, testInfo) => {
    await new ZephyrReporter().updateTestResultInZephyr(testInfo.title, testInfo.status);
  });

  test('[TC-XXX] - Should be able to perform accessibility run for Home page @smoke', async ({ page }) => {

    await test.step(`Given the user navigates to the login page`, async () => {
      await new LoginHelper(page).launchApplication();
    });

    await test.step(`Then perform accessibility violations for Login page`, async () => {
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4
      expect.soft(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
