import { Locator, expect, Page } from '@playwright/test';
type OpenKeys = 'Space' | 'Enter';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(locator: T) {
  const getRoot = () => {
    return locator.locator('[data-collapsible]');
  };

  const getTrigger = () => {
    return getRoot().getByRole('button');
  };

  const getContent = () => {
    return getRoot().locator('[data-collapsible-content]');
  };

  const openCollapsible = async (key: OpenKeys | 'click') => {
    await getTrigger().focus();

    if (key !== 'click') {
      await getTrigger().press(key);
    } else {
      await getTrigger().click();
    }

    // should be open initially
    await expect(getContent()).toBeVisible();
  };

  return {
    ...locator,
    locator,
    getRoot,
    getTrigger,
    getContent,
    openCollapsible,
  };
}
