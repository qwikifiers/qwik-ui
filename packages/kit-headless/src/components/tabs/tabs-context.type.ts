import { Signal, QRL } from '@builder.io/qwik';
import { Behavior } from './behavior.type';
import { TabInfo } from './tabs';

export interface TabsContext {
  selectedIndex: Signal<number>;
  selectedTabId: Signal<string>;
  selectTab$: QRL<(tabId: string) => void>;
  showTabs$: QRL<() => void>;
  tabsChanged$: QRL<() => void>;
  tabsMap: { [key: string]: TabInfo };
  tabPanelsMap: { [key: string]: TabInfo };
  behavior: Behavior;
}
