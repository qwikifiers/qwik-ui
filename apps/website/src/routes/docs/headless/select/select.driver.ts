import { Locator, Page } from '@playwright/test';

export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(locator: T) {
  const getRoot = () => {
    return locator.getByRole('combobox');
  };

  return {
    ...locator,
    locator,
    getRoot,
    getListbox() {
      return getRoot().getByRole('listbox');
    },
    getTrigger() {
      return getRoot().getByRole('button');
    },
    // get all options
    getOptions() {
      return getRoot().getByRole('option').all();
    },
  };
}
