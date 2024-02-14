import { expect, Page, test } from '@playwright/test';

export default class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterUsername(email: string): Promise<void> {
    await this.page.getByPlaceholder('Username').fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.getByPlaceholder('Password').fill(password);
  }

  async clickSignIn(): Promise<void> {
    await this.page.locator('[data-test="login-button"]').click();
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
      `Failed to check presence of data :: ${dataToCheck}`
    ).toBeVisible();
  }
}
