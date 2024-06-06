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

  const getListbox = () => {
    return getRoot().getByRole('listbox');
  };

  // we use data-item so that it doesn't grab native select items.
  const getItems = (hidden?: 'hidden') => {
    if (hidden === 'hidden') return getRoot().locator('[data-item]:hidden');

    return getRoot().locator('[data-item]');
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

  const openListbox = async (key: OpenKeys | 'click') => {
    await getTrigger().focus();

    if (key !== 'click') {
      await getTrigger().press(key);
    } else {
      await getTrigger().click();
    }

    // Needed because Playwright doesn't wait for the listbox to be visible
    await expect(getListbox()).toBeVisible();
  };

  return {
    ...rootLocator,
    locator: rootLocator,
    getRoot,
    getTrigger,
    getListbox,
    getItems,
    getItemsLength,
    getItemAt,
    getValueElement,
    openListbox,
    getHighlightedItem,
  };
}
