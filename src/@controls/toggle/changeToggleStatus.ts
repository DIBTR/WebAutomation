import { Page } from '@playwright/test';

export default async (page: Page, testid: string, valueToChange: boolean) => {
  const currentValue = await page.getByTestId(testid).getAttribute('aria-checked');
  if ((currentValue === 'true' && valueToChange === false) || (currentValue === 'false' && valueToChange === true)) {
    await page.waitForTimeout(200);
    await page.getByTestId(testid).click();
    await page.waitForTimeout(200);
  }
};
