import { Locator, Page } from '@playwright/test';
type OpenKeys = 'ArrowUp' | 'Enter' | 'Space' | 'ArrowDown';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(locator: T) {
  const getRoot = () => {
    return locator;
  };

  const getTrigger = () => {
    return getRoot().getByRole('button');
  };

  const getListbox = () => {
    return getRoot().getByRole('listbox');
  };

  const getOptions = () => {
    return getRoot().getByRole('option');
  };

  const getOptionsLength = () => {
    return getOptions().count();
  };

  const getOptionAt = (index: number) => {
    return getOptions().nth(index);
  };

  const getLastOption = () => {
    return getOptions().last();
  };

  const getValue = async () => {
    // annoyingly, it seems we need to check if the listbox is hidden in playwright, or else the value does not update
    await getListbox().isHidden();

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
    // await expect(getListbox()).toBeVisible();
  };

  return {
    ...locator,
    locator,
    getRoot,
    getTrigger,
    getListbox,
    getOptionsLength,
    getOptionAt,
    getLastOption,
    getValue,
    openListbox,
  };
}
