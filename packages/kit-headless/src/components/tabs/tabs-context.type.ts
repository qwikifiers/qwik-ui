import type { QRL, Signal } from '@builder.io/qwik';
import type { KeyCode } from '../../utils/key-code.type';

export interface TabsContext {
  selectTab$: QRL<(tabId: string) => void>;
  setTabDisabledStatus$: QRL<(tabId: string, disabled: boolean) => void>;
  onTabKeyDown$: QRL<(key: KeyCode, tabId: string) => void>;
  selectIfAutomatic$: QRL<(tabId: string) => void>;
  selectedIndexSig: Signal<number>;
  tabsPrefix: string;
  selectedClassName?: string;
}
