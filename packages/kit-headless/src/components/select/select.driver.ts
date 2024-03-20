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

  const getOptions = (options?: { evenIfHidden?: boolean }) => {
    return getRoot().getByRole('option', { includeHidden: options?.evenIfHidden });
  };

  const getOptionsLength = async (options?: { evenIfHidden?: boolean }) => {
    return getOptions({ evenIfHidden: options?.evenIfHidden }).count();
  };

  const getOptionAt = (index: number | 'last') => {
    if (index === 'last') return getOptions().last();
    return getOptions().nth(index);
  };

  const getHiddenOptionAt = (index: number | 'last') => {
    if (index === 'last') return getOptions({ evenIfHidden: true }).last();
    return getOptions({ evenIfHidden: true }).nth(index);
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
