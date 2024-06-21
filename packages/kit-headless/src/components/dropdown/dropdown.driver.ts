import { expect, type Locator, type Page } from '@playwright/test';
type OpenKeys = 'ArrowUp' | 'Enter' | 'Space' | 'ArrowDown';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getRoot = () => {
    return rootLocator;
  };

  const getTrigger = () => {
    return getRoot().getByRole('button');
  };

  const getContent = () => {
    return getRoot().locator('[data-content]');
  };

  const getItems = () => {
    return getRoot().locator('[data-menu-item]');
  };

  const getItemsLength = async () => {
    return getItems().count();
  };

  const getItemAt = (index: number | 'last') => {
    if (index === 'last') return getItems().last();
    return getItems().nth(index);
  };

  const getValueElement = () => {
    return getTrigger().locator('[data-value]');
  };

  const getHighlightedItem = () => {
    return getRoot().locator('[data-highlighted]');
  };

  const openDropdown = async (key: OpenKeys | 'click') => {
    await getTrigger().focus();

    if (key !== 'click') {
      await getTrigger().press(key);
    } else {
      await getTrigger().click();
    }

    // Needed because Playwright doesn't wait for the dropdown to be visible
    await expect(getContent()).toBeVisible();
  };

  return {
    ...rootLocator,
    locator: rootLocator,
    getRoot,
    getTrigger,
    getContent,
    getItems,
    getItemsLength,
    getItemAt,
    getValueElement,
    openDropdown,
    getHighlightedItem,
  };
}
