import type { QRL, Signal } from '@builder.io/qwik';
import { createContextId } from '@builder.io/qwik';

export const toggleGroupBaseContextId = createContextId<ToggleGroupBaseContext>(
  'qui-toggle-group-base',
);

export const toggleGroupValueContextId = createContextId<ToggleGroupValueContext>(
  'qui-toggle-group-value',
);

export type Orientation = 'horizontal' | 'vertical';
export type Direction = 'ltr' | 'rtl';

type ItemId = string;
export type ToggleGroupBaseContext = {
  disabled: boolean;
  orientation: Orientation;
  direction: Direction;
  rootId: string;
  loop: boolean;
  itemsRefs: Signal<Map<ItemId, Signal>>;
};

type ToggleGroupValueCommonContext = {
  multiple: boolean;
  onItemActivate$: QRL<(value: string) => void>;
  onItemDeactivate$: QRL<(value: string) => void>;
};

type ToggleGroupValueSingleContext = ToggleGroupValueCommonContext & {
  pressedValuesSig: Signal<string>;
};

type ToggleGroupValueMultipleContext = ToggleGroupValueCommonContext & {
  pressedValuesSig: Signal<string[]>;
};

export type ToggleGroupValueContext =
  | ToggleGroupValueSingleContext
  | ToggleGroupValueMultipleContext;
