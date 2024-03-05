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

  async clickOnDropDown(nth : number): Promise<void> {
    await this.page.locator('[class*="persistenceOption"]>div>div>div~div>input').nth(nth).click();
  }

  async selectWindHeight(windHeightToSelect: []): Promise<void> {
    console.log(`Selecting wind height :: ${windHeightToSelect}`);
    await this.page.locator('[class*="-indicatorContainer"]').nth(0).click();
    for (let i = 0; i < windHeightToSelect.length; i++) {
      console.log(`Selecting wind height :: ${windHeightToSelect[i]}`);
      await this.page.locator('[class*="weatherOption"]>div>div>div~div>input').nth(0).click();
      await this.page.waitForTimeout(1000);
      await this.page.getByText(windHeightToSelect[i], { exact: true }).click();
      await this.page.waitForTimeout(1000);
    }
  }

  async selectWeatherWindow(windowToSelect: ['']): Promise<void> {
    for (let i = 0; i < windowToSelect.length; i++) {
      console.log(`Selecting weather window :: ${windowToSelect[i].toString().trim()}`);
      this.clickOnDropDown(0);
      await this.page.waitForTimeout(1000);
      await this.page.getByText(windowToSelect[i].toString().trim(), { exact: true }).click();
      await this.page.waitForTimeout(1000);
    }
  }

  async selectSignificantWaveHeight(waveHeight: ['']): Promise<void> {
    for (let i = 0; i < waveHeight.length; i++) {
      console.log(`Selecting Significant Wave Height :: ${waveHeight[i].toString().trim()}`);
      this.clickOnDropDown(1);
      await this.page.waitForTimeout(1000);
      await this.page.getByText(waveHeight[i].toString().trim(), { exact: true }).click();
      await this.page.waitForTimeout(1000);
    }
  }

  async selectWavePeriod(wavePeriod: ['']): Promise<void> {
    for (let i = 0; i < wavePeriod.length; i++) {
      console.log(`Selecting Wave Period :: ${wavePeriod[i].toString().trim()}`);
      this.clickOnDropDown(2);
      await this.page.waitForTimeout(1000);
      await this.page.getByText(wavePeriod[i].toString().trim(), { exact: true }).last().click();
      await this.page.waitForTimeout(1000);
    }
  }

  async selectMeanWindSpeed(windSpeed: ['']): Promise<void> {
    for (let i = 0; i < windSpeed.length; i++) {
      console.log(`Selecting Mean Wind Speed :: ${windSpeed[i].toString().trim()}`);
      this.clickOnDropDown(3);
      await this.page.waitForTimeout(1000);
      await this.page.getByText(windSpeed[i].toString().trim(), { exact: true }).last().click();
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
