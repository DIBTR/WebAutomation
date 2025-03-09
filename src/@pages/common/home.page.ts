import { Page } from '@playwright/test';

export default class HomePage {
  private readonly page: Page;
  private readonly clickOnContinueAsGuestSelector: string = 'Continue As Guest';
  private readonly login = 'LOGIN';

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnContinueAsGuest(): Promise<void> {
    await this.page.getByText(this.clickOnContinueAsGuestSelector).click();
  }

  async clickOnLoginButton(): Promise<void> {
    await this.page.getByText(this.login, { exact: true }).click();
  }
}
