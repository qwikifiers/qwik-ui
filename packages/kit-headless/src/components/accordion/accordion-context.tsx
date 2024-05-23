import { QRL, Signal, createContextId } from '@builder.io/qwik';

export const accordionContextId = createContextId<AccordionContext>('qui-accordion');

export type AccordionContext = {
  selectedIndexSig: Signal<number | null>;
  initialIndex?: number;
  givenValueSig: Signal<string | null> | undefined;
  multiple?: boolean;
  onChange$: QRL<(value: string) => void> | undefined;
  itemsMapSig?: Signal<Map<number, boolean>> | undefined;
  triggerRefsArray: Signal<Array<Signal>>;
  disabled?: boolean;
};

export const accordionItemContextId =
  createContextId<AccordionItemContext>('qui-accordion-item');

export type AccordionItemContext = {
  isOpenSig: Signal<boolean>;
  localIndexSig: Signal<number>;
  triggerRef: Signal<HTMLButtonElement>;
};
