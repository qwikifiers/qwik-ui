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

  const getOptions = (evenIfHidden?: boolean) => {
    return getRoot().getByRole('option', { includeHidden: evenIfHidden });
  };

  const getOptionsLength = () => {
    return getOptions().count();
  };

  const getOptionAt = (index: number | 'last') => {
    if (index === 'last') return getOptions().last();
    return getOptions().nth(index);
  };

  const getHiddenOptionAt = (index: number | 'last') => {
    if (index === 'last') return getOptions(true).last();
    return getOptions(true).nth(index);
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
  };

  return {
    ...locator,
    locator,
    getRoot,
    getTrigger,
    getListbox,
    getOptionsLength,
    getOptionAt,
    getHiddenOptionAt,
    getValueElement,
    openListbox,
  };
}
