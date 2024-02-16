import { expect, test } from '@playwright/test';
import LoginHelper from '@helpers/common/loginHelper';
import store from '@store/store';
import ZephyrReporter from '@utils/ZReporter';
import paths from '@constants/paths';

test.describe('@smokeSuite', () => {
  test.afterEach(async ({}, testInfo) => {
    await new ZephyrReporter().updateTestResultInZephyr(testInfo.title, testInfo.status);
  });

  test('[TC-XXX] - Validate api response during end2end test flow @smoke', async ({ page }) => {
    page.on('request', (request) => {
      console.log(`Checking HTTP request method :: ${request.method()}, for endpoint :: ${request.url()}`);
    });

    page.on('response', (response) => {
      console.log(`Received response :: ${response.status()}, for endpoint :: ${response.url()}`);
      expect(response.status(), `Validating successful response for endpoint :: ${response.url()}`).toBe(200);
    });

    const { credentialData } = store.getState();

    await test.step(`Given the user navigates to the login page`, async () => {
      await new LoginHelper(page).launchApplication();
    });

    await test.step(`When user enter invalid credentials and click on Sign-In`, async () => {
      await new LoginHelper(page).tryLogin(
        credentialData.standard_user.username,
        credentialData.standard_user.password
      );
    });

    await test.step(`Then user should be logged in successfully`, async () => {
      await expect(page).toHaveURL(paths.standard.inventory.slug);
    });
  });
});
