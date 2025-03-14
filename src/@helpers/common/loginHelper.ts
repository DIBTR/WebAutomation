import { Page } from '@playwright/test';
import { url } from '@config';
import { LoginPage } from '@pages/common';
import HomePage from '@pages/common/home.page';

export default class LoginHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async launchApplication(): Promise<void> {
    await this.page.setViewportSize({
      width: 1400, // min width should be 1680 to make sure web app does not change zoom
      height: 720,
    });

    this.page.setDefaultNavigationTimeout(40000);
    await this.page.goto(url.applicationURL);
  }

  async tryLogin(username: string, password: string): Promise<void> {
    await new HomePage(this.page).clickOnLoginButton();
    await new LoginPage(this.page).enterUsername(username);
    await new LoginPage(this.page).enterPassword(password);
    await new LoginPage(this.page).clickSignIn();
  }
}
