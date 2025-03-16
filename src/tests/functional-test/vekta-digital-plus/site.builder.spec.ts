/* eslint-disable no-console */
import { expect, test } from '@playwright/test';
import paths from '@constants/paths';
import LoginHelper from '@helpers/common/loginHelper';
import SiteBuilderHelper from '@helpers/siteBuilderHelper';
import CommonPage from '@pages/common/common.page';
import DrawControlMenuPage from '@pages/common/draw.control.page';
import GraphViewPage from '@pages/common/graph.view.page';
import SiteAnchorsPage from '@pages/common/site.anchors';
import {
  setSiteBuilderOptionsDefault,
  setSiteBuilderOptionsCustomHex,
} from '@slices/site-builder/site-builder.slice';
import store from '@store/store';

test.describe('@smokeSuite @siteCreationFlow @vektaDigitalPlus', () => {
  test.afterEach(async ({ page }, testInfo) => {
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  });

  test('[TC-3] - Verify user should be able to create a site with Default SITE BUILDER OPTIONS @smoke', async ({
    page,
  }) => {
    store.dispatch(setSiteBuilderOptionsDefault());
    const {
      siteWorkflow: {
        details: { forSiteBuildOptionsPopup },
      },
    } = store.getState();

    console.log(forSiteBuildOptionsPopup);

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
      await new GraphViewPage(page).clickOnSiteCreatedOnMap();
      const element = await new GraphViewPage(page).getPlottedSite();
      await expect(element).toHaveScreenshot('site-with-default.png', { threshold: 0.1 });
      await page.waitForTimeout(8000);
    });
  });

  test('[TC-7] - Verify user should be able to create a site with custom options on site builder popup @smoke', async ({ page }) => {
    store.dispatch(setSiteBuilderOptionsCustomHex());
    const {
      siteWorkflow: {
        details: { forSiteBuildOptionsPopup },
      },
    } = store.getState();

    console.log(`************* Test Data *************`);
    console.log(forSiteBuildOptionsPopup);
    console.log(`************************************`);

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
      await new SiteBuilderHelper(page).createSite({ forSiteBuildOptionsPopup });
      await new GraphViewPage(page).isSiteCreatedOnMap();
    });

    await test.step(`Then user should be able to see created site on Map`, async () => {
      await new GraphViewPage(page).isSiteCreatedOnMap();
      await new GraphViewPage(page).clickOnSiteCreatedOnMap();
      const element = await new GraphViewPage(page).getPlottedSite();
      await expect(element).toHaveScreenshot('site-with-hex.png', { threshold: 0.5 });
      await page.waitForTimeout(8000);
    });
  });

  test.only('[] - Verify user should be able to create a site and able to take it towards cable optimisation @smoke', async ({
    page,
  }) => {
    store.dispatch(setSiteBuilderOptionsCustomHex());
    const {
      siteWorkflow: {
        details: { forSiteBuildOptionsPopup },
      },
    } = store.getState();

    console.log(`************* Test Data *************`);
    console.log(forSiteBuildOptionsPopup);
    console.log(`************************************`);

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
      await new SiteBuilderHelper(page).createSite({ forSiteBuildOptionsPopup });
      await new GraphViewPage(page).isSiteCreatedOnMap();
    });

    await test.step(`Then user should be able to see created site on Map`, async () => {
      await new GraphViewPage(page).isSiteCreatedOnMap();
      await new GraphViewPage(page).clickOnSiteCreatedOnMap();
      await new DrawControlMenuPage(page).clickOnAnchor();
      await new DrawControlMenuPage(page).placeAnchor();
      await new SiteAnchorsPage(page).clickOnPlaceAnchor();
      await new SiteAnchorsPage(page).clickOnDisplayOnMainMap();
      await page.waitForTimeout(30000);
      await new DrawControlMenuPage(page).clickOnPlaceOSP();
      await new DrawControlMenuPage(page).clickOnOSPPencil();
      await new DrawControlMenuPage(page).placeOSP();
      await new DrawControlMenuPage(page).clickOnAddTurbineCluster();
      await new DrawControlMenuPage(page).clickOnPencilIconForCluster();
      await new DrawControlMenuPage(page).placeClustering();
      await page.waitForTimeout(30000);
      await new DrawControlMenuPage(page).clickOnCable();
      await new DrawControlMenuPage(page).clickOnAutomaticPlaceCabeling();
    });
  });
});
