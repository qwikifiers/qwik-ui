import { Signal, QRL } from '@builder.io/qwik';
import { Behavior } from './behavior.type';
import { TabInfo } from './tabs';
import { KeyCode } from '../../utils/key-code.type';

export interface TabsContext {
  selectTab$: QRL<(tabId: string) => void>;
  showTabs$: QRL<() => void>;
  onTabsChanged$: QRL<() => void>;
  onTabKeyDown$: QRL<(key: KeyCode, tabId: string) => void>;
  selectedIndexSig: Signal<number>;
  selectedTabIdSig: Signal<string>;
  tabsMap: { [key: string]: TabInfo };
  tabPanelsMap: { [key: string]: TabInfo };
  behavior: Behavior;

  lastAssignedTabIndexSig: Signal<number>;
  lastAssignedPanelIndexSig: Signal<number>;
}
