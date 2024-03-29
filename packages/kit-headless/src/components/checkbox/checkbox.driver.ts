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
  const getCheckList = async () => {
    return getRoot().getByRole('group');
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
  };
}