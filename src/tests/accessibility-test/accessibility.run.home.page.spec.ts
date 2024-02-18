import { expect, test } from '@playwright/test';
import LoginHelper from '@helpers/common/loginHelper';
import store from '@store/store';
import ZephyrReporter from '@utils/ZReporter';
import paths from '@constants/paths';
import AxeBuilder from '@axe-core/playwright';

test.describe('@smokeSuite', () => {
  test.afterEach(async ({}, testInfo) => {
    await new ZephyrReporter().updateTestResultInZephyr(testInfo.title, testInfo.status);
  });

  test('[TC-XXX] - Should be able to perform accessibility run for Login page @smoke', async ({ page }) => {
    const { credentialData } = store.getState();

    await test.step(`Given the user navigates to the login page`, async () => {
      await new LoginHelper(page).launchApplication();
    });
    
    await test.step(`When user enter valid credentials and click on Sign-In`, async () => {
      await new LoginHelper(page).tryLogin(
        credentialData.standard_user.username,
        credentialData.standard_user.password
      );
    });

    await test.step(`Then user should be logged in successfully`, async () => {
      await expect(page).toHaveURL(paths.standard.inventory.slug);
    });

    await test.step(`Then perform accessibility violations for Home page`, async () => {
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4
      expect.soft(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
