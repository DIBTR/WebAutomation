import { Page } from '@playwright/test';

export default class HomePage {
  private readonly page: Page;
  private readonly clickOnContinueAsGuestSelector: string = 'Continue As Guest';

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnContinueAsGuest(): Promise<void> {
    await this.page.getByText(this.clickOnContinueAsGuestSelector).click();
  }
}
