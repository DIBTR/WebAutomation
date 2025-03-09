import { expect, Page } from '@playwright/test';

export default class CommonPage {
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
}
