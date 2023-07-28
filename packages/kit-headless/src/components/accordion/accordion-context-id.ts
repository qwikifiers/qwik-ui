import { createContextId } from '@builder.io/qwik';
import { AccordionRootContext, AccordionItemContext } from './accordion-context.type';

export const accordionRootContextId =
  createContextId<AccordionRootContext>('accordion-root');

export const accordionItemContextId =
  createContextId<AccordionItemContext>('accordion-item');
