import { expect, test } from '@playwright/test';
import paths from '@constants/paths';
import LoginHelper from '@helpers/common/loginHelper';
import CommonPage from '@pages/common/common.page';
import DrawControlMenuPage from '@pages/common/draw.control.page';
import GraphViewPage from '@pages/common/graph.view.page';
import store from '@store/store';
import ZephyrReporter from '@utils/ZReporter';

test.describe('@smokeSuite @siteCreationFlow @vektaDigitalPlus', () => {
  test.afterEach(async ({ page }, testInfo) => {
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    await new ZephyrReporter().updateTestResultInZephyr(testInfo.title, testInfo.status);
  });

  test('[TC-XXX] - User should be able to create a site with Default SITE BUILDER OPTIONS @smoke', async ({ page }) => {
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

    await test.step(`When user creates site`, async () => {
      await new DrawControlMenuPage(page).openSiteBuilder();
      await new DrawControlMenuPage(page).createSite();
      await new GraphViewPage(page).isSiteCreatedOnMap();
    });

    await test.step(`Then user should be able to see created site on Map`, async () => {
      await new GraphViewPage(page).isSiteCreatedOnMap();
      await new GraphViewPage(page).clicOnSiteCreatedOnMap();
      const element = await new GraphViewPage(page).getPlottedSite();
      await expect(element).toHaveScreenshot('site-with-default.png');
      await page.waitForTimeout(8000);
    });
  });
});
