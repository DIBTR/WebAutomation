import { Page, expect } from '@playwright/test';

export default class WeatherAnalysisPage {
  private readonly page: Page;
  private readonly mapContainerSelector: string = '.leaflet-container';
  private readonly canvasSelector: string = 'canvas';
  private readonly speedDistrubutionGraphSelector: string = '[class="nsewdrag drag"]';
  private readonly persistenceAnalysisCollapseSelector: string = '[class="inputControlsHide"]';
  private readonly weatherAnalysisMapSelector = '[id="weatherAnalysis_plotlyPlots"]';
  private readonly persistentAnalysisResultsDialogueSelector =
    '[class="ReactModal__Overlay ReactModal__Overlay--after-open"]';

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnLocationOnMap(locationDetails: any): Promise<void> {
    await this.page.waitForSelector(this.mapContainerSelector);
    await this.page.waitForTimeout(5000);
    await expect(this.page.locator(this.canvasSelector)).toBeVisible();
    await this.page.locator(this.canvasSelector).click({
      position: {
        x: locationDetails.positionOnMap.x,
        y: locationDetails.positionOnMap.y,
      },
    });
    await this.page.waitForSelector(this.speedDistrubutionGraphSelector);
    await this.page.waitForTimeout(15000);
  }

  async clickOnPersistenceAnalysis(): Promise<void> {
    await this.page.locator(this.persistenceAnalysisCollapseSelector).click();
  }

  async clickOnWeatherWindow(): Promise<void> {
    await this.page.locator('[class*="persistenceOption"]>div>div>div~div>input').first().click();
  }

  async selectWeatherWindow(windowToSelect: ['']): Promise<void> {
    for (let i = 0; i < windowToSelect.length; i++) {
      console.log(`Selecting weather window :: ${windowToSelect[i].toString().trim()}`);
      this.clickOnWeatherWindow();
      await this.page.waitForTimeout(1000);
      await this.page.getByText(windowToSelect[i].toString().trim(), { exact: true }).click();
      await this.page.waitForTimeout(1000);
    }
  }

  async clickOnRunAnalysis(): Promise<void> {
    await this.page.getByRole('button', { name: 'Run Analysis' }).click();
  }

  async waitUntillPersistenceAnalysisResultsLoaded(): Promise<void> {
    await this.page.waitForSelector('[class="popup_heading"]');
  }

  async captureAndAssertGraphSnapshot(): Promise<void> {
    await expect(this.page.locator(this.weatherAnalysisMapSelector)).toBeVisible();
    expect
      .soft(
        await this.page.locator(this.weatherAnalysisMapSelector).screenshot({ path: 'baseline-screenshots/graph.png' })
      )
      .toMatchSnapshot({
        threshold: 0.5,
      });
  }

  async captureAndAssertPersistentAnalysisResultsDialogueSnapshot(): Promise<void> {
    await expect(this.page.locator(this.persistentAnalysisResultsDialogueSelector)).toBeVisible();
    expect
      .soft(
        await this.page
          .locator(this.persistentAnalysisResultsDialogueSelector)
          .screenshot({ path: 'baseline-screenshots/result.png' })
      )
      .toMatchSnapshot();
  }
}
