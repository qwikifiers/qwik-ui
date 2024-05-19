import { Signal, createContextId } from '@builder.io/qwik';

export const accordionContextId = createContextId<AccordionContext>('qui-accordion');

export type AccordionContext = {
  selectedIndexSig: Signal<number | null>;
  initialIndexValue?: number;
  givenValueSig: Signal<string | null> | undefined;
  multiple?: boolean;
};

export const accordionItemContextId =
  createContextId<AccordionItemContext>('qui-accordion-item');

export type AccordionItemContext = {
  isOpenSig: Signal<boolean>;
  localIndexSig: Signal<number>;
};
