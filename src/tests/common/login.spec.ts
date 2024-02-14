import { expect, test } from '@playwright/test';
import LoginHelper from '@helpers/common/loginHelper';
import store from '@store/store';
import ZephyrReporter from '@utils/ZReporter';
import { setCustomerValidLogin, setCustomerInValidLogin } from '@pages/common/credential.slice';
import { LoginPage } from '@pages/common';
import paths from '@constants/paths';

test.describe('@smokeSuite', () => {
  test.afterEach(async ({}, testInfo) => {
    await new ZephyrReporter().updateTestResultInZephyr(testInfo.title, testInfo.status);
  });

  test('[TC-XXX] - Should be able to successful login with valid credentials @smoke', async ({ page }) => {
    store.dispatch(setCustomerValidLogin(store.getState()));
    const { credential } = store.getState();
    await new LoginHelper(page).tryLogin(credential.username, credential.password);
    await expect(page).toHaveURL(paths.standard.inventory.slug);
  });

  test('[TC-XXX] - Should not be able to successful login with invalid credentials @smoke', async ({ page }) => {
    store.dispatch(setCustomerInValidLogin(store.getState()));
    const { credential } = store.getState();
    await new LoginHelper(page).tryLogin(credential.username, credential.password);
    await new LoginPage(page).isDataPresent(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });
});
