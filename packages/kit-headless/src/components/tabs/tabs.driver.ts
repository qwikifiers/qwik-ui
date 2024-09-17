import { type Locator, type Page } from '@playwright/test';

export type DriverLocator = Locator | Page;

export function createTabsTestDriver<T extends DriverLocator>(rootLocator: T) {
  const getRoot = () => {
    return rootLocator;
  };

  const getTabsRoot = () => {
    return getRoot();
  };

  const getTabList = () => {
    return getRoot().getByRole('tablist');
  };

  const getTab = (index: number | 'last') => {
    const tabs = getRoot().getByRole('tab');
    if (index === 'last') return tabs.last();
    return tabs.nth(index);
  };

  const getAllTabs = () => {
    return getRoot().getByRole('tab');
  };

  const getTabPanel = () => {
    return getRoot().getByRole('tabpanel');
  };

  const getAllTabPanels = () => {
    return getRoot().locator('[role="tabpanel"]');
  };

  const getSelectedIndexFromEvent = () => {
    return getRoot().locator('[data-testid="selected-index-from-event"]');
  };

  const getSelectedTabIdFromEvent = () => {
    return getRoot().locator('[data-testid="selected-tab-id-from-event"]');
  };

  return {
    ...rootLocator,
    locator: rootLocator,
    getRoot,
    getTabsRoot,
    getTabList,
    getTab,
    getAllTabs,
    getTabPanel,
    getAllTabPanels,
    getSelectedIndexFromEvent,
    getSelectedTabIdFromEvent,
  };
}
