import { QRL } from '@builder.io/qwik';
import { TabInfo } from './tabs';
import { KeyCode } from '../../utils/key-code.type';

export interface TabsContext {
  selectTab$: QRL<(tabId: string) => void>;
  getNextServerAssignedTabIndex$: QRL<() => number>;
  getNextServerAssignedPanelIndex$: QRL<() => number>;
  updateTabState$: QRL<(tabId: string, state: Partial<TabInfo>) => void>;
  reIndexTabs$: QRL<() => void>;
  getMatchedPanelId$: QRL<(tabId: string) => string | undefined>;
  getMatchedTabId$: QRL<(tabId: string) => string | undefined>;
  onTabKeyDown$: QRL<(key: KeyCode, tabId: string) => void>;
  isIndexSelected$: QRL<(index?: number) => boolean>;
  isTabSelected$: QRL<(tabId: string) => boolean>;
  isPanelSelected$: QRL<(panelId: string) => boolean>;
  selectIfAutomatic$: QRL<(tabId: string) => void>;
  selectedClassName?: string;
}
