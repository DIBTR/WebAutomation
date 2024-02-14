import { Page } from '@playwright/test';

export default async ({
  page,
  title,
  forSection,
  index,
}: {
  page: Page;
  title: string;
  forSection: string;
  index: number;
}): Promise<void> => {
  await page
    .locator(`div:near(:text('${forSection}'))`)
    .getByText(title)
    .first()
    .locator('..')
    .locator('..')
    .getByRole('button')
    .nth(index)
    .click();
};
