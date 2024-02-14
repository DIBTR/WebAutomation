import { Page } from '@playwright/test';

export default async ({ page, title, date }: { page: Page; title: string; date: number }): Promise<void> => {
  await page.getByText(title).locator('..').locator('..').getByRole('button', { name: date.toString() }).last().click();
};
