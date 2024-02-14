import { Page, test } from '@playwright/test';

export default async ({ page, name }: { page: Page; name: string }): Promise<void> => {
  await test.step(`Clicking ${name} button`, async () => {
    await page
      .getByRole('button', { name: `${name}` })
      .first()
      .click();
  });
};
