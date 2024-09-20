import type { Locator, Page } from '@playwright/test';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getRoot = () => {
    return rootLocator;
  };

  const getIcon = () => {
    return getRoot().locator('#indicator');
  };
  const getCheckList = () => {
    return getRoot().getByRole('checkbox');
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

  const getSelectAll = () => {
    return getRoot().locator('[data-qds-selectall]');
  };

  const getSelectAllIndicator = () => {
    return getSelectAll().locator('[data-qds-indicator]');
  };

  const getTriCheckbox = () => {
    return getRoot().locator('#selectAll');
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
    getTriCheckbox,
    getSelectAll,
    getSelectAllIndicator,
  };
}
