import { Page } from '@playwright/test';

export default async ({ page, label, value }: { page: Page; label: string; value: string }): Promise<void> => {
  const autoSuggestContainer = page.getByText(label).locator('..').locator('..');
  await autoSuggestContainer.getByRole('combobox').fill(value);
  await autoSuggestContainer.locator(`[title="${value}"]`).first().click();
};
