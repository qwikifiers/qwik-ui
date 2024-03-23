import { type Locator, type Page } from '@playwright/test';

export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getCombobox = () => {
    return rootLocator.locator('[combobox]');
  };

  const getTrigger = () => {
    return rootLocator.getByRole('button', { name: 'Toggle list of Listbox' });
  };

  const selectOption = (value: string) => {
    return rootLocator.getByText(value);
  };

  return {
    ...rootLocator,
    locator: rootLocator,
    getCombobox,
    getTrigger,
    selectOption,
  };
}
