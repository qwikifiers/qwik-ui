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

  // we use data-option so that it doesn't grab native select options.
  const getOptions = (hidden?: 'hidden') => {
    if (hidden === 'hidden') return getRoot().locator('[data-option]:hidden');

    return getRoot().locator('[data-option]');
  };

  const getOptionsLength = async () => {
    return getOptions().count();
  };

  const getOptionAt = (index: number | 'last') => {
    if (index === 'last') return getOptions().last();
    return getOptions().nth(index);
  };

  const getHiddenOptionAt = (index: number | 'last') => {
    if (index === 'last') return getOptions('hidden').last();
    return getOptions().nth(index);
  };

  const getValueElement = () => {
    return getTrigger().locator('[data-value]');
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
    getOptions,
    getOptionsLength,
    getOptionAt,
    getHiddenOptionAt,
    getValueElement,
    openListbox,
  };
}
