import { expect, type Locator, type Page } from '@playwright/test';
type OpenKeys = 'ArrowUp' | 'ArrowDown';
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

  const getVisibleItemsLength = () => {
    return getRoot().locator('[data-item]:visible').count();
  };

  const getItemsLength = async () => {
    return await getItems().count();
  };

  const getItemAt = (index: number | 'last') => {
    if (index === 'last') return getItems().last();
    return getItems().nth(index);
  };

  const getInput = () => {
    return getRoot().locator('[data-combobox-input]');
  };

  const getHighlightedItem = () => {
    return getRoot().locator('[data-highlighted]');
  };

  const getControl = () => {
    return getRoot().locator('[data-combobox-control]');
  };

  const openListbox = async (key: OpenKeys | 'click') => {
    if (key !== 'click') {
      await getInput().press(key);
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
    getInput,
    openListbox,
    getHighlightedItem,
    getVisibleItemsLength,
    getControl,
  };
}
