import { Page } from '@playwright/test';

export default class SideBarPage {
  private readonly page: Page;
  private readonly weatherAnalysisSelector: string = '[id="WeatherAnalysis"]';

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnWeatherAnalysisSelector(): Promise<void> {
    await this.page.locator(this.weatherAnalysisSelector).click();
  }
}
