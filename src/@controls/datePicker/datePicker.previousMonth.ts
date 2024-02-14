import { Page } from '@playwright/test';

export default async ({ page, title }: { page: Page; title: string }): Promise<void> => {
  const PREVIOUS_BUTTON_POSITION = 1;
  await page.getByText(title).locator('..').locator('..').getByRole('button').nth(PREVIOUS_BUTTON_POSITION).click();
};
