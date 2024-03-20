import { type Locator, type Page } from '@playwright/test';

export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getPopover = () => {
    return rootLocator.locator('[popover]');
  };

  const getTrigger = () => {
    return rootLocator.locator('[popovertarget]');
  };

  return {
    ...rootLocator,
    locator: rootLocator,
    getPopover,
    getTrigger,
  };
}
