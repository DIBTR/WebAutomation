/* eslint-disable no-console */
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
    if (format !== 'Square') {
      console.log(`Selecting Grid Format: ${format}`);
      const dropdown = this.page.locator(`//*[text()='Square']`).last();
      await dropdown.click({ force: true });
      await this.page.getByText(format, { exact: true }).click();
      await this.page.waitForTimeout(3000);
    }
  }

  async selectPlacementAlignment(placement: string): Promise<void> {
    if (placement !== '') {
      await this.page
        .locator(
          `//*[text()='Placement Alignment']/following-sibling::div/span[2]/following-sibling::div/div/div/input`
        )
        .scrollIntoViewIfNeeded();
      await this.page
        .locator(
          `//*[text()='Placement Alignment']/following-sibling::div/span[2]/following-sibling::div/div/div/input`
        )
        .first()
        .click();
      await this.page.getByText(placement, { exact: true }).click();
    }
  }

  async enterRows(rows: string): Promise<void> {
    console.log(`Entering Rows: ${rows}`);
    await this.page.getByPlaceholder(`e.g. 5`).first().fill(rows);
    await this.page.waitForTimeout(1000);
  }

  async enterColumns(columns: string): Promise<void> {
    console.log(`Entering Columns: ${columns}`);
    await this.page.getByPlaceholder(`e.g. 5`).last().fill(columns);
    await this.page.waitForTimeout(1000);
  }

  async enterTurbineSelection(turbine: string): Promise<void> {
    if (turbine !== '') {
      await this.page
        .locator(
          `//*[text()='Turbine Selection']/parent::div/following::div[2]/div/div/div/following-sibling::div/input`
        )
        .scrollIntoViewIfNeeded();
      await this.page
        .locator(
          `//*[text()='Turbine Selection']/parent::div/following::div[2]/div/div/div/following-sibling::div/input`
        )
        .first()
        .click();
      await this.page.getByText(turbine, { exact: true }).click();
    }
  }

  async enterTurbineSpacing(spacing: string): Promise<void> {
    console.log(`Entering Turbine Spacing: ${spacing}`);
    if (spacing !== '1200') {
      await this.page.getByPlaceholder(`e.g. 1200`).fill(spacing);
      await this.page.waitForTimeout(1000);
    }
  }

  async enterSiteInsetBuffer(buffer: string): Promise<void> {
    console.log(`Entering Site Inset Buffer: ${buffer}`);
    if (buffer !== '2500') {
      await this.page.getByPlaceholder(`e.g. 2500`).fill(buffer);
      await this.page.waitForTimeout(1000);
    }
  }

  async enterTurbineAngle(angle: string): Promise<void> {
    console.log(`Entering Turbine Angle: ${angle}`);
    if (angle !== '') {
      await this.page.getByPlaceholder(`e.g. Prevailing Wind`).fill(angle);
      await this.page.waitForTimeout(1000);
    }
  }

  async clickOnCreateSite(): Promise<void> {
    await this.page.getByRole('button', { name: 'Create Site' }).click();
  }
}
