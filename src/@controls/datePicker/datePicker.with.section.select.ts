import { Page } from '@playwright/test';
export default async ({
  page,
  title,
  forSection,
  date,
}: {
  page: Page;
  title: string;
  forSection: string;
  date: number;
}): Promise<void> => {
  await page
    .locator(`div:near(:text('${forSection}'))`)
    .getByText(title)
    .first()
    .locator('..')
    .locator('..')
    .getByRole('button', { name: date.toString() })
    .last()
    .click();
};
