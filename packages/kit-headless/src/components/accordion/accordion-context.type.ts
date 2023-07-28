import { Signal, QRL } from '@builder.io/qwik';

export interface AccordionRootContext {
  focusFirstTrigger$: QRL<() => void>;
  focusPreviousTrigger$: QRL<() => void>;
  focusNextTrigger$: QRL<() => void>;
  focusLastTrigger$: QRL<() => void>;
  currFocusedTriggerIndexSig: Signal<number>;
  currSelectedTriggerIndexSig: Signal<number>;
  selectedTriggerIdSig: Signal;
  triggerStore: HTMLElement[];
  collapsible: boolean;
  behavior?: string;
  animated?: boolean;
}

export interface AccordionItemContext {
  isTriggerExpandedSig: Signal<boolean>;
  defaultValue: boolean;
  itemId: string;
}
