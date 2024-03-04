import { test } from '@playwright/test';
import LoginHelper from '@helpers/common/loginHelper';
import ZephyrReporter from '@utils/ZReporter';
import PrivactCookiePage from '@pages/common/privacy-cookie.page';
import HomePage from '@pages/common/home.page';
import SideBarPage from '@pages/common/side.bar.page';
import WeatherAnalysisPage from '@pages/weatherAnalysis/weather.analysis.page';

test.describe('@smokeSuite', () => {
  test.afterEach(async ({}, testInfo) => {
    await new ZephyrReporter().updateTestResultInZephyr(testInfo.title, testInfo.status);
  });

  test('[TC-XXX] - Should be able to run Persistance weather analysis with 8 hsrs window @smoke', async ({ page }) => {
    await test.step(`Given the user navigates to the login page`, async () => {
      await new LoginHelper(page).launchApplication();
    });

    await test.step(`When User accepts cookies and select Continue as Guest option`, async () => {
      await new PrivactCookiePage(page).clickOnAcceptCookies();
      await new HomePage(page).clickOnContinueAsGuest();
    });

    await test.step(`And When User select location on map`, async () => {
      await new SideBarPage(page).clickOnWeatherAnalysisSelector();
      await new WeatherAnalysisPage(page).clickOnLocationOnMap();
    });

    await test.step(`Then capture and assert Weather Analysis graph view`, async () => {
      await new WeatherAnalysisPage(page).captureAndAssertGraphSnapshot();
    });

    await test.step(`And When User run persistance weather analysis with 8 Hrs window`, async () => {
      await new WeatherAnalysisPage(page).clickOnPersistenceAnalysis();
      await new WeatherAnalysisPage(page).clickOnWeatherWindow();
      await new WeatherAnalysisPage(page).selectWeatherWindow('8');
      await new WeatherAnalysisPage(page).clickOnRunAnalysis();
    });

    await test.step(`Then capture and assert Persistent Analysis Results Dialogue view`, async () => {
      await new WeatherAnalysisPage(page).waitUntillPersistenceAnalysisResults();
      await new WeatherAnalysisPage(page).captureAndAssertPersistentAnalysisResultsDialogueSnapshot();
    });
  });
});
