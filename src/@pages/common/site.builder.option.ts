import { Page } from '@playwright/test';

export default class SiteBuilderOptionPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterSiteName(name: string): Promise<void> {
    await this.page.getByPlaceholder(`Demo Site`).fill(name);
    await this.page.keyboard.press('Tab');
  }

  async selectGridFormat(format: string): Promise<void> {
  const mapContainer = await this.page.locator(".leaflet-container");
  await mapContainer.scrollIntoViewIfNeeded();
    await this.page.evaluate(() => window.scrollBy(0, window.innerHeight));
    const dropdown = this.page.locator(`//*[text()='Square']`).last();
    await dropdown.click();
    await this.page.getByText(format, { exact: true }).click();
  }

  async selectPlacementAlignment(placement: string): Promise<void> {
    await this.page.locator(`//*[text()='Placement Alignment']/following-sibling::div/span[2]/following-sibling::div/div/div/input`).scrollIntoViewIfNeeded();
    await this.page
      .locator(`//*[text()='Placement Alignment']/following-sibling::div/span[2]/following-sibling::div/div/div/input`)
      .first()
      .click();
    await this.page.getByText(placement, { exact: true }).click();
  }

  async enterRows(rows: string): Promise<void> {
    await this.page.getByPlaceholder(`e.g. 5`).first().fill(rows);
  }

  async enterColumns(columns: string): Promise<void> {
    await this.page.getByPlaceholder(`e.g. 5`).last().fill(columns);
  }

  async enterTurbineSelection(turbine: string): Promise<void> {
    await this.page.locator(`//*[text()='Turbine Selection']/parent::div/following::div[2]/div/div/div/following-sibling::div/input`).scrollIntoViewIfNeeded();
    await this.page
      .locator(`//*[text()='Turbine Selection']/parent::div/following::div[2]/div/div/div/following-sibling::div/input`)
      .first()
      .click();
    await this.page.getByText(turbine, { exact: true }).click();
  }

  async enterTurbineSpacing(spacing: string): Promise<void> {
    await this.page.getByPlaceholder(`e.g. 1200`).fill(spacing);
  }

  async enterSiteInsetBuffer(buffer: string): Promise<void> {
    await this.page.getByPlaceholder(`e.g. 2500`).fill(buffer);
  }

  async enterTurbineAngle(angle: string): Promise<void> {
    await this.page.getByPlaceholder(`e.g. Prevailing Wind`).fill(angle);
  }

  async clickOnCreateSite(): Promise<void> {
    await this.page.getByRole('button', { name: 'Create Site' }).click();
  }
}
