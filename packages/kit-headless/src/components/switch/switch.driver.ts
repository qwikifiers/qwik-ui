import { type Locator, type Page } from '@playwright/test';
type OpenKeys = 'ArrowUp' | 'Enter' | 'Space' | 'ArrowDown';
export type DriverLocator = Locator | Page;

export function createTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getRoot = () => {
    return rootLocator;
  };

  const getInputElement = () => {
    return getRoot().locator('[data-qui-switch-input]');
  };

  const getTriggerLabel = () => {
    return getRoot().locator('[data-switch-label]');
  };

  const openListbox = async (key: OpenKeys | 'click') => {
    await getInputElement().focus();

    if (key !== 'click') {
      await getInputElement().press(key);
    } else {
      await getInputElement().click();
    }
  };

  return {
    ...rootLocator,
    locator: rootLocator,
    getRoot,
    getInputElement,
    openListbox,
    getTriggerLabel,
  };
}
