import { expect, type Locator, type Page } from '@playwright/test';
type OpenKeys = 'ArrowUp' | 'Enter' | 'Space' | 'ArrowDown';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getRoot = () => {
    return rootLocator;
  };

  const getIcon = () => {
    return getRoot().getByRole('img');
  };
  const getCheckList = () => {
    return getRoot().getByRole('group');
  };
  const getChecklistUL = () => {
    // note: filter method is always relative to the original locator not document root despite using root
    const ul = getCheckList().filter({ has: rootLocator.locator('css=ul') });
    return ul;
  };
  const getChecklistLIs = () => {
    const li = getChecklistUL().filter({ has: rootLocator.locator('css=li') });
    return li;
  };
  const getCheckbox = () => {
    return getRoot().getByRole('checkbox');
  };
  return {
    ...rootLocator,
    locator: rootLocator,
    getRoot,
    getIcon,
    getCheckList,
    getCheckbox,
    getChecklistUL,
    getChecklistLIs,
  };
}
