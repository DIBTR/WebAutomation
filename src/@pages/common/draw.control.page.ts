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

  async clickOnAnchor() : Promise<void> {
    await this.page.locator('[title="Apply Anchors"]>svg').click();
    await this.page.waitForTimeout(2000);
  }

  async clickOnCable() : Promise<void> {
    await this.page.locator('[title="Place Cables"]>img').click();
    await this.page.waitForTimeout(2000);
  }

  async clickOnPlaceOSP() : Promise<void> {
    await this.page.locator('[data-testid="ElectricalServicesIcon"]').click();
    await this.page.waitForTimeout(2000);
  }

  async clickOnOSPPencil() : Promise<void> {
    await this.page.locator('[title="OSP Draw"]>[data-icon="pencil"]').click();
    await this.page.waitForTimeout(2000);
  }

  async clickOnAddTurbineCluster() : Promise<void> {
    await this.page.locator('[title="Add Turbine Cluster"]>svg>path').click();
    await this.page.waitForTimeout(2000);
  }

  async clickOnPencilIconForCluster() : Promise<void> {
    await this.page.locator('[title="Cluster Draw"]').click();
    await this.page.waitForTimeout(2000);
  }

  async clickOnAutomaticClustering() : Promise<void> {
    await this.page.locator('[title="Automatic Clustering"]').click();
    await this.page.waitForTimeout(2000);
  }

  async clickOnPencilIconForPlaceCabel() : Promise<void> {
    await this.page.locator('[data-icon="pencil"]').click();
    await this.page.waitForTimeout(2000);
  }

  async clickOnAutomaticPlaceCabeling() : Promise<void> {
    await this.page.locator('[title="Automatic Cable Placement"]>[data-icon="wand-magic-sparkles"]').click();
    await this.page.waitForTimeout(2000);
  }

  async placeClustering() : Promise<void> {
    await this.page.locator('[pointer-events="none"]>g>[class*=" leaflet-interactive"]').first().click();
  }

  async placeOSP() : Promise<void> {
    await this.page.locator('[pointer-events="none"]>g>[class*=" leaflet-interactive"]').first().click();
  }

  async placeAnchor() : Promise<void> {
    await this.page.locator('[pointer-events="none"]>g>[class*=" leaflet-interactive"]').first().click();
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
