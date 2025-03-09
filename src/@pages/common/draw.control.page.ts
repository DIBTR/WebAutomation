import { expect, Page } from '@playwright/test';

export default class DrawControlMenuPage {
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

  async openSiteBuilder() : Promise <void> {
    await this.page.getByRole('button', { name: 'Site Builder' }).click();
  }

  async createSite() : Promise<void> {
    await this.page.getByText('Click map to build').click();
    await this.page.waitForTimeout(2000);
    await this.page.locator('#root div').filter({ hasText: '+− Base Map (CARTO) Grey' }).nth(3).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('button', { name: 'Create Site' }).click();
    await this.page.waitForTimeout(60000);
  }
}
