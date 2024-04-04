import { type Locator, type Page } from '@playwright/test';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getLabel = () => {
    return rootLocator.locator('label');
  };

  const getInput = () => {
    return rootLocator.locator('input');
  };

  return {
    ...rootLocator,
    getLabel,
    getInput,
  };
}
