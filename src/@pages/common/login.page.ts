import { expect, Page, test } from '@playwright/test';

export default class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterUsername(email: string): Promise<void> {
    await this.page.locator(`[id="toolLogin_email"]`).fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.locator(`[id="toolLogin_password"]`).fill(password);
  }

  async clickSignIn(): Promise<void> {
    await this.page.locator(`//*[text()='Login']`).click();
  }

  async login(username: string, password: string): Promise<void> {
    await test.step(`Login using username ${username} and password ${password}`, async () => {
      await this.enterUsername(username);
      await this.enterPassword(password);
      await this.clickSignIn();
    });
  }

  async isDataPresent(dataToCheck: string): Promise<void> {
    await expect(
      this.page.getByText(`${dataToCheck}`),
      `Checking presence of data :: ${dataToCheck}`
    ).toBeVisible();
  }
}
