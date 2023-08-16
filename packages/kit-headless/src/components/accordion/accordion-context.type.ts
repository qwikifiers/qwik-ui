import { Signal, QRL } from '@builder.io/qwik';

export interface AccordionRootContext {
  updateTriggers$: QRL<() => void>;
  focusFirstTrigger$: QRL<() => void>;
  focusPreviousTrigger$: QRL<() => void>;
  focusNextTrigger$: QRL<() => void>;
  focusLastTrigger$: QRL<() => void>;
  currFocusedTriggerIndexSig: Signal<number>;
  currSelectedTriggerIndexSig: Signal<number>;
  selectedTriggerIdSig: Signal;
  triggerElementsSig: Signal<HTMLButtonElement[]>;
  collapsible: boolean;
  behavior?: string;
  animated?: boolean;
}

export interface AccordionItemContext {
  isTriggerExpandedSig: Signal<boolean>;
  defaultValue: boolean;
  itemId: string;
}
