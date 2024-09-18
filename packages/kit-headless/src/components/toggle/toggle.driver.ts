import { type Locator, type Page } from '@playwright/test';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getRoot = () => {
    return rootLocator;
  };

  const getToggleButton = () => {
    return getRoot().getByRole('button').nth(0);
  };

  const pressButtonWithEnter = () => {
    getToggleButton().focus();
    return getToggleButton().press('Enter');
  };

  const pressButtonWithSpace = () => {
    getToggleButton().focus();
    return getToggleButton().press('Space');
  };

  return {
    ...rootLocator,
    locator: rootLocator,
    getRoot,
    getToggleButton,
    pressButtonWithEnter,
    pressButtonWithSpace,
  };
}
