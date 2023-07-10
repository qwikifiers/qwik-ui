import { Signal, QRL } from '@builder.io/qwik';

export interface AccordionRootContext {
  rootRef: Signal<HTMLDivElement | undefined>;
  getSelectedTriggerId$: QRL<(triggerId: string) => string>;
  selectedTriggerIdSig: Signal;
  behavior: string;
}

export interface AccordionItemContext {
  itemId: string;
  isTriggerExpandedSig: Signal<boolean>;
}
