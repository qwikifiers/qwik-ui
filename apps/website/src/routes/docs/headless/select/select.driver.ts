import { Locator, Page, expect } from '@playwright/test';
import { type OpenKeys } from '@qwik-ui/headless';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(locator: T) {
  const getRoot = () => {
    return locator.getByRole('combobox');
  };

  const getTrigger = () => {
    return getRoot().getByRole('button');
  };

  const getListbox = () => {
    return getRoot().getByRole('listbox');
  };

  const getOptions = () => {
    return getRoot().getByRole('option', { includeHidden: true }).all();
  };

  const getValue = async () => {
    // annoyingly, it seems we need to check if the listbox is hidden in playwright, or else the value does not update
    await expect(getListbox()).toBeHidden();

    return await getTrigger().locator('[data-value]').textContent();
  };

  const openListbox = async (key: OpenKeys | 'click') => {
    await getTrigger().focus();

    if (key !== 'click') {
      await getTrigger().press(key);
    } else {
      await getTrigger().click();
    }

    // should be open initially
    await expect(getListbox()).toBeVisible();
  };

  return {
    ...locator,
    locator,
    getRoot,
    getTrigger,
    getListbox,
    getOptions,
    getValue,
    openListbox,
  };
}
