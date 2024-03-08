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
  private readonly persistentAnalysisResultSummaryTabAndCustomTableSelector = '[class="probability_output"]';
  private readonly windHeightSelector = '[class*="-indicatorContainer"]';
  private readonly windHeightDropDownSelector = '[class*="weatherOption"]>div>div>div~div>input';

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

  async clickOnDropDown(nth: number): Promise<void> {
    await this.page.locator('[class*="persistenceOption"]>div>div>div~div>input').nth(nth).click();
  }

  async selectWindHeight(windHeightToSelect: []): Promise<void> {
    await this.page.locator(this.windHeightSelector).nth(0).click();
    for (let i = 0; i < windHeightToSelect.length; i++) {
      console.log(`Selecting wind height :: ${windHeightToSelect[i]}`);
      await this.page.locator(this.windHeightDropDownSelector).nth(0).click();
      await this.page.waitForTimeout(1000);
      await this.page.getByText(windHeightToSelect[i], { exact: true }).first().click();
      await this.page.waitForTimeout(5000);
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
    await this.page.waitForTimeout(10000);
  }

  async waitUntillPersistenceAnalysisResultsLoaded(): Promise<void> {
    await this.page.waitForSelector('[class="popup_heading"]');
    await this.page.waitForSelector('[class="popup_footer"]>footer>button');
    await this.page.evaluate(() => {
      const targetElement = document.querySelector('[class="popup_footer"]>footer>button');
      if (targetElement) {
        console.log('Scrolling to the element');
        targetElement.scrollIntoView();
      }
    });
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

  async captureAndAssertPersistentAnalysisResultsSummaryTab(): Promise<void> {
    await expect(this.page.locator(this.persistentAnalysisResultsDialogueSelector)).toBeVisible();
    expect
      .soft(
        await this.page
          .locator(this.persistentAnalysisResultSummaryTabAndCustomTableSelector)
          .first()
          .screenshot({ path: 'baseline-screenshots/result-summaryTab.png' })
      )
      .toMatchSnapshot();
  }

  async captureAndAssertPersistentAnalysisResultsDialogueSnapshot(): Promise<void> {
    await this.waitUntillPersistenceAnalysisResultsLoaded();
    await expect(this.page.locator(this.persistentAnalysisResultsDialogueSelector)).toBeVisible();
    expect
      .soft(
        await this.page
          .locator(this.persistentAnalysisResultSummaryTabAndCustomTableSelector)
          .nth(1)
          .screenshot({ path: 'baseline-screenshots/result-customTable.png' })
      )
      .toMatchSnapshot();
  }

  async validate8HourWindowResults(expectedResultsFor8Window: []): Promise<void> {
    for (let i = 0; i < expectedResultsFor8Window.length; i++) {
      const actualValue = await this.page
        .locator('tbody[class*="MuiTableBody-root"]>tr:nth-child(1)>td')
        .nth(i)
        .textContent();
      expect
        .soft(
          Number(actualValue),
          `Checking does actual value : ${Number(
            actualValue
          )}, matching with expected value : ${expectedResultsFor8Window[i]}`
        )
        .toBe(expectedResultsFor8Window[i]);
    }
  }
}
