import { expect, test } from '@playwright/test';
import LoginHelper from '@helpers/common/loginHelper';
import store from '@store/store';
import ZephyrReporter from '@utils/ZReporter';
import paths from '@constants/paths';
import {
  BatchInfo,
  Configuration,
  EyesRunner,
  Eyes,
  Target,
} from '@applitools/eyes-playwright';

export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;

test.describe('@smokeSuite', () => {
  let eyes: Eyes;

  test.beforeEach(async ({ page }) => {
    eyes = new Eyes(Runner, Config);
    await eyes.open(page, 'Saucelabs Demo Site', test.info().title, { width: 1200, height: 600 });
  });

  test.afterEach(async ({}, testInfo) => {
    await eyes.close();
    await new ZephyrReporter().updateTestResultInZephyr(testInfo.title, testInfo.status);
  });

  test('[TC-XXX] - Should be able to successful login with valid credentials @smoke', async ({ page }) => {
    const { credentialData } = store.getState();

    await test.step(`Given the user navigates to the login page`, async () => {
      await new LoginHelper(page).launchApplication();
      await eyes.check('Login page', Target.window().fully());
    });

    await test.step(`When user enter valid credentials and click on Sign-In`, async () => {
      await new LoginHelper(page).tryLogin(
        credentialData.standard_user.username,
        credentialData.standard_user.password
      );
    });

    await test.step(`Then user should be logged in successfully`, async () => {
      await expect(page).toHaveURL(paths.standard.inventory.slug);
      await eyes.check('Home page', Target.window().fully());
    });
  });
});
