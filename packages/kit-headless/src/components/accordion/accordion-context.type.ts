import { Signal, QRL } from '@builder.io/qwik';

export interface AccordionRootContext {
  getSelectedTriggerId$: QRL<(triggerId: string) => string>;
  focusFirstTrigger$: QRL<() => void>;
  focusPreviousTrigger$: QRL<() => void>;
  focusNextTrigger$: QRL<() => void>;
  focusLastTrigger$: QRL<() => void>;
  selectedTriggerIdSig: Signal;
  triggerStore: HTMLButtonElement[];
  collapsible: boolean;
  behavior?: string;
  animated?: boolean;
}

export interface AccordionItemContext {
  isTriggerExpandedSig: Signal<boolean>;
  defaultValue: boolean;
  itemId: string;
}
