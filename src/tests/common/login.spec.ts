import { expect, test } from '@playwright/test';
import LoginHelper from '@helpers/common/loginHelper';
import store from '@store/store';
import ZephyrReporter from '@utils/ZReporter';
import { LoginPage } from '@pages/common';
import paths from '@constants/paths';

test.describe('@smokeSuite', () => {
  test.afterEach(async ({}, testInfo) => {
    await new ZephyrReporter().updateTestResultInZephyr(testInfo.title, testInfo.status);
  });

  test('[TC-XXX] - Should be able to successful login with valid credentials @smoke', async ({ page }) => {
    const { credentialData } = store.getState();

    await new LoginHelper(page).tryLogin(credentialData.standard_user.username, credentialData.standard_user.password);
    await expect(page).toHaveURL(paths.standard.inventory.slug);
  });

  test('[TC-XXX] - Should not be able to successful login with invalid credentials @smoke', async ({ page }) => {
    const { credentialData } = store.getState();
    await new LoginHelper(page).tryLogin(credentialData.invalid_user.username, credentialData.invalid_user.password);
    await new LoginPage(page).isDataPresent(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('[TC-XXX] - Should not be able to successful login for locked credentials @smoke', async ({ page }) => {
    const { credentialData } = store.getState();
    await new LoginHelper(page).tryLogin(
      credentialData.locked_out_user.username,
      credentialData.locked_out_user.password
    );
    await new LoginPage(page).isDataPresent('Epic sadface: Sorry, this user has been locked out.');
  });

  test('[TC-XXX] - Should not be fail to login with invalid credentials to demonstrate screenshot in report @smoke', async ({ page }) => {
    const { credentialData } = store.getState();
    await new LoginHelper(page).tryLogin(credentialData.invalid_user.username, credentialData.invalid_user.password);
    await expect(page).toHaveURL(paths.standard.inventory.slug);
  });
});
