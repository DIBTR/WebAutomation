import { expect, Page } from '@playwright/test';

export default class GraphViewPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isDataPresent(dataToCheck: string): Promise<void> {
    await expect(
      this.page.getByText(`${dataToCheck}`),
      `Checking presence of data :: ${dataToCheck}`
    ).toBeVisible();
  }

  async isSiteCreatedOnMap() : Promise <void> {
    await expect(this.page.locator(`img[class="leaflet-marker-icon leaflet-zoom-animated leaflet-interactive"]`)).toBeVisible();
  }

  async createSite() : Promise<void> {
    await this.page.getByText('Click map to build').click();
    await this.page.waitForTimeout(2000);
    await this.page.locator('#root div').filter({ hasText: '+− Base Map (CARTO) Grey' }).nth(3).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('button', { name: 'Create Site' }).click();
  }
}
