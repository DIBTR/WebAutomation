import { Page } from '@playwright/test';
import getToggleSwitch from './getToggleSwitch';

export default async ({ page, label }: { page: Page; label: string }): Promise<void> => {
  const toggle = getToggleSwitch(page, label);

  const toggleValue = await toggle.getAttribute('aria-checked');

  if (toggleValue !== 'true') {
    await toggle.click();
  }
};
