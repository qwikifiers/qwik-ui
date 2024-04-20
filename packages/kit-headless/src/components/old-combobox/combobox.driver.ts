import { expect, type Locator, type Page } from '@playwright/test';
type OpenKeys = 'ArrowUp' | 'Enter' | 'Space' | 'ArrowDown';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getRoot = () => {
    return rootLocator.locator('[data-combobox]');
  };

  const getTrigger = () => {
    return getRoot().getByRole('button');
  };

  const getListbox = () => {
    return getRoot().getByRole('listbox');
  };

  // we use data-option so that it doesn't grab native select options.
  const getOptions = () => {
    return getRoot().locator('[data-option]');
  };

  const getOptionAt = (index: number | 'last') => {
    if (index === 'last') return getOptions().last();
    return getOptions().nth(index);
  };

  const getInput = () => {
    // would normally be textbox, but ARIA APG uses combobox.
    return getRoot().getByRole('combobox');
  };

  const selectOption = (value: string) => {
    return getRoot().getByText(value);
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
    getInput,
    getOptionAt,
    getOptions,
    openListbox,
    selectOption,
  };
}
