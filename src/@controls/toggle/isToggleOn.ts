import { Page } from '@playwright/test';

export default async ({ page, label }: { page: Page; label: string }): Promise<boolean> => {
  // This is not working as expected, I think the issue is with disabled button
  const toggle = page.getByText(label).locator('..').getByRole('switch');
  const toggleValue = await toggle.getAttribute('aria-checked');

  return toggleValue === 'true';
};
