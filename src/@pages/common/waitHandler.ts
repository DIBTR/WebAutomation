/* eslint-disable no-console */
import { Page, Locator } from '@playwright/test';

export class WaitHandler {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Wait for a specific element to be visible.
   * If the element does not appear within the timeout, it does not fail.
   */
  async waitForElement(selector: string, timeout = 30000): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout });
      return true; // Element appeared
    } catch {
      return false; // Element did not appear within timeout
    }
  }

  /**
   * Wait for an element using a Playwright Locator
   */
  async waitForLocator(locator: Locator, timeout = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for the page to fully load (network idle or complete state)
   */
  async waitForPageLoad(timeout = 5000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout }).catch(() => {
      console.log('Page did not fully load, continuing...');
    });
  }

  /**
   * Wait for an element to be hidden
   */
  async waitForElementToBeHidden(selector: string, timeout = 5000): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { state: 'hidden', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for either an element to appear or timeout to occur
   */
  async waitForElementOrTimeout(selector: string, timeout = 5000): Promise<void> {
    const timeoutPromise = new Promise((resolve) => setTimeout(resolve, timeout));
    const elementPromise = this.page.waitForSelector(selector, { timeout });
    await Promise.race([timeoutPromise, elementPromise]).catch(() => null);
  }
}
