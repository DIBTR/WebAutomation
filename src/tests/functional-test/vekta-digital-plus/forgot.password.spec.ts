import { test } from '@playwright/test';
import LoginHelper from '@helpers/common/loginHelper';
import { LoginPage } from '@pages/common';
import HomePage from '@pages/common/home.page';

test.describe('@smokeSuite @forgotPassword @vektaDigitalPlus', () => {
  test.afterEach(async ({ page }, testInfo) => {
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  });

  test('[TC-XXX] - User sees inline validation message when using an unregistered email  @smoke', async ({ page }) => {
    await test.step(`Given The user is on the "Forgot Password" page`, async () => {
      await new LoginHelper(page).launchApplication();
    });

    await test.step(`When The user enters an unregistered email "wrongemail@example.com"`, async () => {
      await new HomePage(page).clickOnLoginButton();
      await new LoginPage(page).clickOnForgotPassword();
      await new LoginPage(page).enterAccountEmail('wrongemail@example.com');
      await new LoginPage(page).clickSendEmail();
    });

    await test.step(`Then The user should see an inline validation message "Email not found. Please check and try again.`, async () => {
      console.log(`Waiting for defect fix :: Issue-39`);
    });
  });
});
