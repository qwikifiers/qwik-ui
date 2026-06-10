import type { QRL, Signal } from '@qwik.dev/core';
import type { KeyCode } from '../../utils/key-code.type';

export interface TabsContext {
  selectTab$: QRL<(tabId: string) => void>;
  onTabKeyDown$: QRL<(key: KeyCode, tabId: string) => void>;
  selectIfAutomatic$: QRL<(tabId: string) => void>;
  selectedTabIdSig: Signal<string | undefined>;
  tabsPrefix: string;
  selectedClassName?: string;
}
