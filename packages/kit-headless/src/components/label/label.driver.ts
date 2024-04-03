import { type Locator, type Page } from '@playwright/test';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getRoot = () => {
    return rootLocator;
  };

  const getLabel = () => {
    return rootLocator.getByTestId('label');
  };

  const getForElement = () => {
    return rootLocator.getByTestId('input');
  };

  return {
    ...rootLocator,
    getRoot,
    getLabel,
    getForElement,
  };
}
