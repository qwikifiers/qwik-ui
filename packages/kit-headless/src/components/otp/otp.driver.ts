// otp.driver.ts
import { Locator, Page } from '@playwright/test';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getRoot = () => {
    return rootLocator;
  };
  const getInput = () => {
    return rootLocator.locator('[data-qui-otp-native-input]');
  };
  const getVisibleInput = (index: number) => {
    return rootLocator.locator(`[data-qui-otp-item="${index}"]`);
  };

  return {
    ...rootLocator,
    getRoot,
    getInput,
    getVisibleInput,
  };
}
