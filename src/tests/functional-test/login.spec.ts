import { expect, test } from '@playwright/test';
import paths from '@constants/paths';
import LoginHelper from '@helpers/common/loginHelper';
import CommonPage from '@pages/common/common.page';
import store from '@store/store';
import ZephyrReporter from '@utils/ZReporter';

test.describe('@smokeSuite', () => {
  test.afterEach(async ({ page }, testInfo) => {
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    await new ZephyrReporter().updateTestResultInZephyr(testInfo.title, testInfo.status);
  });

  test('[TC-XXX] - Should be able to successful login with valid credentials @smoke', async ({ page }) => {
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
      await new CommonPage(page).isDataPresent('Layer Control');
    });
  });

  test('[TC-XXX] - Should not be able to successful login with invalid credentials @smoke', async ({ page }) => {
    const { credentialData } = store.getState();

    let dialogMessage = '';

    page.on('dialog', async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await test.step(`Given the user navigates to the login page`, async () => {
      await new LoginHelper(page).launchApplication();
    });

    await test.step(`When user enter invalid credentials and click on Sign-In`, async () => {
      await new LoginHelper(page).tryLogin(credentialData.invalid_user.username, credentialData.invalid_user.password);
      await page.waitForTimeout(5000);
    });

    await test.step(`Then user should see an error message`, async () => {
      expect(dialogMessage).toBe('Firebase: Error (auth/invalid-email).');
    });
  });
});
