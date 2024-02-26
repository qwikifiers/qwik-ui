import { Locator, Page } from '@playwright/test';

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

  const getValue = () => {
    return getTrigger().locator('[data-value]').textContent();
  };

  return {
    ...locator,
    locator,
    getRoot,
    getTrigger,
    getListbox,
    getOptions,
    getValue,
  };
}
