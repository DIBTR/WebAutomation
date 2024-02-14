import { Page, Locator } from '@playwright/test';

export default (page: Page, label: string): Locator => {
  return page.getByText(label).locator('..').locator('..').locator('..').getByRole('switch');
};
