import { type Locator, type Page } from '@playwright/test';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getRoot = () => {
    return rootLocator;
  };

  const getToggleGroupRoot = () => {
    return getRoot().locator('[data-qui-togglegroup-root]');
  };

  const getItems = () => {
    return getRoot().locator('[data-qui-togglegroup-item]');
  };

  const getItemsLength = () => {
    return getItems().count();
  };

  const getItemByIndex = (index: number) => {
    return getItems().nth(index);
  };

  return {
    ...rootLocator,
    locator: rootLocator,
    getRoot,
    getToggleGroupRoot,
    getItems,
    getItemsLength,
    getItemByIndex,
  };
}
