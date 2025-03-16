/* eslint-disable no-console */
import { Page } from '@playwright/test';

export default class AutomaticPlaceCabelingPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnPlaceAnchor(): Promise<void> {
    await this.page.getByRole('button', { name: 'Generate Cables' }).click({ timeout: 50000 });
  }
}
