import { test } from '@playwright/test';
import LoginHelper from '@helpers/common/loginHelper';
import ZephyrReporter from '@utils/ZReporter';
import PrivactCookiePage from '@pages/common/privacy-cookie.page';
import HomePage from '@pages/common/home.page';
import SideBarPage from '@pages/common/side.bar.page';
import WeatherAnalysisPage from '@pages/weatherAnalysis/weather.analysis.page';
import store from '@store/store';
import { setPersistentAnalysisReport } from '@test-data/weatherAnalysis/weatherAnalysisReport.slice';

test.describe('@smokeSuite', () => {
  test.afterEach(async ({}, testInfo) => {
    await new ZephyrReporter().updateTestResultInZephyr(testInfo.title, testInfo.status);
  });

  test('[TC-XXX] - Should be able to run Persistance weather analysis with 8 hr window @smoke', async ({ page }) => {

    store.dispatch(setPersistentAnalysisReport(store.getState()));
    const {
      weatherAnalysis: {
        details: {
          forPersistenceAnalysisReport
        },
      },
    } = store.getState();

    await test.step(`Given the user navigates to the home page`, async () => {
      await new LoginHelper(page).launchApplication();
    });

    await test.step(`When User accepts cookies and select Continue as Guest option`, async () => {
      await new PrivactCookiePage(page).clickOnAcceptCookies();
      await new HomePage(page).clickOnContinueAsGuest();
    });

    await test.step(`And When a user selects a location on the map using coordinates ${JSON.stringify(forPersistenceAnalysisReport.locationDetails)}`, async () => {
      await new SideBarPage(page).clickOnWeatherAnalysisSelector();
      await new WeatherAnalysisPage(page).clickOnLocationOnMap(forPersistenceAnalysisReport.locationDetails);
    });

    await test.step(`Then capture and assert the Weather Analysis graph view for correctness`, async () => {
      await new WeatherAnalysisPage(page).captureAndAssertGraphSnapshot();
    });

    await test.step(`And when the user runs Persistence Weather Analysis with an 8-hour window`, async () => {
      await new WeatherAnalysisPage(page).clickOnPersistenceAnalysis();
      await new WeatherAnalysisPage(page).selectWeatherWindow(forPersistenceAnalysisReport.persistenceAnalysis.weatherWindow);
      await new WeatherAnalysisPage(page).clickOnRunAnalysis();
    });

    await test.step(`Then capture and assert the Persistent Analysis Results Dialogue view for correctness`, async () => {
      await new WeatherAnalysisPage(page).waitUntillPersistenceAnalysisResultsLoaded();
      await new WeatherAnalysisPage(page).captureAndAssertPersistentAnalysisResultsDialogueSnapshot();
    });
  });
});
