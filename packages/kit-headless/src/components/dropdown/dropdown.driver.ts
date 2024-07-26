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

  const getPopover = () => {
    return getRoot().getByRole('menu');
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
    await expect(getPopover()).toBeVisible();
  };

  return {
    ...rootLocator,
    locator: rootLocator,
    getRoot,
    getTrigger,
    getPopover,
    getItems,
    getItemsLength,
    getItemAt,
    getValueElement,
    openDropdown,
    getHighlightedItem,
  };
}
