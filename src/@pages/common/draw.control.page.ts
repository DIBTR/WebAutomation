/* eslint-disable no-console */
import { expect, Page } from '@playwright/test';

export default class DrawControlMenuPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isDataPresent(dataToCheck: string): Promise<void> {
    await expect(this.page.getByText(`${dataToCheck}`), `Checking presence of data :: ${dataToCheck}`).toBeVisible();
  }

  async openSiteBuilder(): Promise<void> {
    await this.page.getByRole('button', { name: 'Site Builder' }).click();
    await this.page.waitForTimeout(4000);
  }

  async createSite(): Promise<void> {
    await this.page.getByText('Click map to build').click();
    await this.page.waitForTimeout(2000);
    await this.page.locator('#root div').filter({ hasText: '+− Base Map (CARTO) Grey' }).nth(3).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('button', { name: 'Create Site' }).click();
    await this.page.waitForTimeout(60000);
  }

  async openSiteBuilderPoup(): Promise<void> {
    // await this.page.getByText('Click map to build').click();
     // await this.page.locator('#root div').filter({ hasText: '+− Base Map (CARTO) Grey' }).nth(3).click();
    await this.clickOnBottomInMap();
    await this.page.waitForTimeout(3000);
  }

  private async clickOnBottomInMap(): Promise<void> {
    const viewport = this.page.viewportSize();
    if (viewport !== null) {
      console.log(`Viewport size: ${JSON.stringify(viewport)}`);
      const centerX = viewport.width / 2;
      const centerY = viewport.height * 0.5;
      console.log(`Trying to click at (${centerX}, ${centerY})`);
      await this.page.mouse.dblclick(centerX, centerY, { button:'left' });
      await this.page.waitForTimeout(3000);
    }
  }
}
