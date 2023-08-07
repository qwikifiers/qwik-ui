import type { QRL, Signal } from '@builder.io/qwik';
import type { KeyCode } from '../../utils/key-code.type';
import type { TabInfo } from './tabs';

export interface TabsContext {
  selectTab$: QRL<(tabId: string) => void>;
  updateTabState$: QRL<(tabId: string, state: Partial<TabInfo>) => void>;
  onTabKeyDown$: QRL<(key: KeyCode, tabId: string) => void>;
  selectIfAutomatic$: QRL<(tabId: string) => void>;
  selectedIndexSig: Signal<number>;
  tabsPrefix: string;
  selectedClassName?: string;
}
