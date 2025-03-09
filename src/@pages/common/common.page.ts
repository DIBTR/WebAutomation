import { expect, Page } from '@playwright/test';
import { WaitHandler } from './waitHandler';

export default class CommonPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isDataPresent(dataToCheck: string): Promise<void> {
    await new WaitHandler(this.page).waitForElement('[title="Site Builder"]');
    await expect(
      this.page.getByText(`${dataToCheck}`),
      `Checking presence of data :: ${dataToCheck}`
    ).toBeVisible();
  }
}
