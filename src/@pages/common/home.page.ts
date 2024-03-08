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

  async enterUsername(email: string): Promise<void> {
    await this.page.locator('[for="toolLogin_email"]').fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.locator('[id="toolLogin_password"]').fill(password);
  }

  async clickSignIn(): Promise<void> {
    await this.page.getByText('LOGIN', {exact : true}).click();
  }
}
