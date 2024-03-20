import { component$, Slot, PropsOf } from '@builder.io/qwik';

import {
  AccordionContent as QwikUIAccordionContent,
  AccordionHeader as QwikUIAccordionHeader,
  AccordionItem as QwikUIAccordionItem,
  AccordionRoot as QwikUIAccordionRoot,
  AccordionTrigger as QwikUIAccordionTrigger,
} from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

import { LuChevronDown } from '@qwikest/icons/lucide';

export const Accordion = component$<PropsOf<typeof QwikUIAccordionRoot>>((props) => (
  <QwikUIAccordionRoot animated {...props} class={props.class}>
    <Slot />
  </QwikUIAccordionRoot>
));

export const AccordionItem = component$<PropsOf<typeof QwikUIAccordionItem>>((props) => {
  return (
    <QwikUIAccordionItem {...props} class={cn('border-b', props.class)}>
      <Slot />
    </QwikUIAccordionItem>
  );
});

export const AccordionTrigger = component$<
  PropsOf<typeof QwikUIAccordionTrigger> & {
    header?: PropsOf<typeof QwikUIAccordionHeader>['as'];
  }
>(({ header = 'h3', ...props }) => {
  return (
    <QwikUIAccordionHeader as={header} class="flex">
      <QwikUIAccordionTrigger
        {...props}
        class={cn(
          'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
          props.class,
        )}
      >
        <Slot />
        <LuChevronDown class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </QwikUIAccordionTrigger>
    </QwikUIAccordionHeader>
  );
});

export const AccordionContent = component$<PropsOf<typeof QwikUIAccordionContent>>(
  (props) => {
    return (
      <QwikUIAccordionContent
        {...props}
        class={cn(
          'overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
          props.class,
        )}
      >
        <div class="pb-4 pt-0">
          <Slot />
        </div>
      </QwikUIAccordionContent>
    );
  },
);
