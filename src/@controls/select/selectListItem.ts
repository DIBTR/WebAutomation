import { Page } from '@playwright/test';

export default async ({
  page,
  testId,
  sectionItem,
}: {
  page: Page;
  testId: string;
  sectionItem: string;
}): Promise<void> => {
  await page.getByTestId(testId).click();
  await page.locator(`[title='${sectionItem}']`).click();
};
