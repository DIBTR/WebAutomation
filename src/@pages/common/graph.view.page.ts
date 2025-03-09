import { expect, Locator, Page } from '@playwright/test';

export default class GraphViewPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isDataPresent(dataToCheck: string): Promise<void> {
    await expect(this.page.getByText(`${dataToCheck}`), `Checking presence of data :: ${dataToCheck}`).toBeVisible();
  }

  async isSiteCreatedOnMap(): Promise<void> {
    await expect(
      this.page.locator(`img[class="leaflet-marker-icon leaflet-zoom-animated leaflet-interactive"]`)
    ).toBeVisible();
  }

  async clicOnSiteCreatedOnMap(): Promise<void> {
    await this.page.locator(`img[class="leaflet-marker-icon leaflet-zoom-animated leaflet-interactive"]`).click();
    await this.page.waitForTimeout(8000);
  }

  async getPlottedSite(): Promise<Locator> {
    await this.page.waitForTimeout(5000);
    return this.page.locator('[class="leaflet-interactive"]').first();
  }

  async createSite(): Promise<void> {
    await this.page.getByText('Click map to build').click();
    await this.page.waitForTimeout(2000);
    await this.page.locator('#root div').filter({ hasText: '+− Base Map (CARTO) Grey' }).nth(3).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('button', { name: 'Create Site' }).click();
  }
}
