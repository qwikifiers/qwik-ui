import { type TabInfo } from './tabs';

export const getEnabledTab = (tabInfoList: TabInfo[], index: number) =>
  findNextEnabledTab(tabInfoList, index) || findPrevEnabledTab(tabInfoList, index);

// Find an enabled tab including the index
export function findNextEnabledTab(
  tabsInfo: TabInfo[],
  index: number,
  config?: { wrap: boolean },
) {
  let info;
  for (let i = Math.max(0, index); i < tabsInfo.length; i++) {
    info = tabsInfo[i];
    if (!isDisabled(info)) {
      return info;
    }
  }
  if (config?.wrap) {
    for (let i = 0; i < index; i++) {
      info = tabsInfo[i];
      if (!isDisabled(info)) {
        return info;
      }
    }
  }
  return;
}

// Find an enabled tab before the index
export function findPrevEnabledTab(
  tabsInfo: TabInfo[],
  index: number,
  config?: { wrap: boolean },
) {
  let info;
  for (let i = Math.min(tabsInfo.length, index) - 1; i >= 0; i--) {
    info = tabsInfo[i];
    if (!isDisabled(info)) {
      return info;
    }
  }
  if (config?.wrap) {
    for (let i = tabsInfo.length - 1; i > index; i--) {
      info = tabsInfo[i];
      if (!isDisabled(info)) {
        return info;
      }
    }
  }
  return;
}

export const isDisabled = (tabInfo: TabInfo) => tabInfo.tabProps.disabled;
