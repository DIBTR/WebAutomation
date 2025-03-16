/* eslint-disable no-console */
import { Page } from '@playwright/test';

export default class SiteAnchorsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnPlaceAnchor(): Promise<void> {
    await this.page.getByRole('button', { name: 'Place Anchors' }).click({ timeout: 50000 });
  }

  async clickOnDisplayOnMainMap(): Promise<void> {
    await this.page.getByRole('button', { name: 'Display on Main Map' }).click({ timeout: 50000 });
  }
}
