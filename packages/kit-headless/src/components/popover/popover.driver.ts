import { type Locator, type Page } from '@playwright/test';

export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getPopover = () => {
    return rootLocator.locator('[popover]');
  };

  const getTrigger = () => {
    return rootLocator.locator('[popovertarget]');
  };

  const getAllPopovers = () => {
    return getPopover().all();
  };

  const getAllTriggers = () => {
    return getTrigger().all();
  };

  return {
    ...rootLocator,
    locator: rootLocator,
    getPopover,
    getAllPopovers,
    getTrigger,
    getAllTriggers,
  };
}
