import { Signal, QRL } from '@builder.io/qwik';
import { Behavior } from './behavior.type';

export interface TabsContext {
  selectedIndex: Signal<number>;
  selectedTabId: Signal<string>;
  selectedTabPanelId: Signal<string>;
  selectTab$: QRL<(tabId: string) => void>;
  tabsChanged$: QRL<() => void>;
  indexByTabId: { [key: string]: number };
  indexByTabPanelId: { [key: string]: number };
  behavior: Behavior;
}
