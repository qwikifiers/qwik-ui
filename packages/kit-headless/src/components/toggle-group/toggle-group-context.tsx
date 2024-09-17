import type { QRL, Signal } from '@builder.io/qwik';
import { createContextId } from '@builder.io/qwik';

export const toggleGroupRootApiContextId = createContextId<ToggleGroupRootApiContext>(
  'qui-toggle-group-root-api',
);

export type Orientation = 'horizontal' | 'vertical';
export type Direction = 'ltr' | 'rtl';

export type ItemId = string;
export type Item = {
  itemId: ItemId;
  ref: Signal<HTMLElement | undefined>;
  isPressed: Signal<boolean>;
  isDisabled: boolean;
  tabIndex: Signal<number>;
};

export type ToggleGroupRootApiContext = {
  rootId: string;
  rootOrientation: Orientation;
  rootDirection: Direction;
  rootIsDisabled: boolean;
  rootIsLoopEnabled: boolean;
  rootMultiple: boolean;
  activateItem$: QRL<(itemValue: string) => Promise<void> | void>;
  deActivateItem$: QRL<(itemValue: string) => Promise<void> | void>;
  getAllItem$: QRL<() => Item[]>;
  pressedValuesSig: Signal<string | string[]>;
  getAndSetTabIndexItem$: QRL<(itemId: ItemId, tabIndexValue: 0 | -1) => void>;
  registerItem$: QRL<(itemId: ItemId, itemSig: Signal<Item>) => void>;
  itemsCSR: Signal<HTMLElement[]>;
};
