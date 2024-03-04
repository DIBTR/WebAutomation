import { Page } from '@playwright/test';

export default class PrivactCookiePage {
  private readonly page: Page;
  private readonly checkboxSelector: string = 'input[type="checkbox"]';
  private readonly submitButtonSelector: string = 'Submit';

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnAcceptCookies(): Promise<void> {
    await this.page.waitForSelector(this.checkboxSelector);
    const checkbox = await this.page.$$(this.checkboxSelector);
    for (let i = 0; i < checkbox.length; i++) {
      await checkbox[i].click();
    }
    await this.page.getByText(this.submitButtonSelector).click();
  }
}
