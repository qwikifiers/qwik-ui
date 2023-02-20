import {
  component$,
  HTMLAttributes,
  PropFunction,
  Slot,
} from '@builder.io/qwik';

import {
  Accordion as HeadlessAccordion,
  AccordionItem as HeadlessAccordionItem,
} from '@qwik-ui/headless';
import { clsq } from '@qwik-ui/shared';

export type AccordionProps = HTMLAttributes<HTMLElement>;
export interface AccordionItemProps {
  label: string;
  disabled?: boolean;
  class?: string;
  style?: string;
  onClick$?: PropFunction<() => void>;
}

export const Accordion = component$((props: AccordionProps) => {
  const { class: classNames, ...rest } = props;
  return (
    <HeadlessAccordion
      class={clsq('border collapse border collapse-arrow', classNames)}
      {...rest}
    >
      <Slot />
    </HeadlessAccordion>
  );
});

export const AccordionItem = component$((props: AccordionItemProps) => {
  const { class: classNames, ...rest } = props;
  return (
    <HeadlessAccordionItem
      class={clsq('collapse-title border', classNames)}
      {...rest}
    >
      <Slot />
    </HeadlessAccordionItem>
  );
});
