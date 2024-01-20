import { component$, Slot } from '@builder.io/qwik';

import {
  AccordionRoot as QwikUIAccordionRoot,
  AccordionItem as QwikUIAccordionItem,
  AccordionHeader as QwikUIAccordionHeader,
  AccordionTrigger as QwikUIAccordionTrigger,
  AccordionContent as QwikUIAccordionContent,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionHeaderProps,
  type AccordionRootProps,
} from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

import { LuChevronDown } from '@qwikest/icons/lucide';

const Accordion = component$<AccordionRootProps>((props) => (
  // RFC: shadcn's AccordionRoot is animated by default, which is probably what most apps will want so I think it makes sense. Remember, this can be changed for the apps that don't want this behavior by default.
  <QwikUIAccordionRoot animated {...props} class={props.class}>
    <Slot />
  </QwikUIAccordionRoot>
));

const AccordionItem = component$<AccordionItemProps>((props) => {
  return (
    <QwikUIAccordionItem {...props} class={cn('border-b', props.class)}>
      <Slot />
    </QwikUIAccordionItem>
  );
});

const AccordionHeader = component$<AccordionHeaderProps>((props) => {
  return (
    <QwikUIAccordionHeader {...props} class={cn('flex', props.class)}>
      <Slot />
    </QwikUIAccordionHeader>
  );
});

const AccordionTrigger = component$<AccordionTriggerProps>(({ ...props }) => {
  return (
    // RFC: shadcn wraps AccordionTigger with AccordionHeader here. I think it's better to keep the API similar to headless so that Accordions can change their Headers to a different html tag with the 'as' prop on a per Accordion basis.
    <QwikUIAccordionTrigger
      {...props}
      class={cn(
        'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        props.class,
      )}
    >
      <Slot />
      <LuChevronDown class="text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200" />
    </QwikUIAccordionTrigger>
  );
});

const AccordionContent = component$<AccordionItemProps>((props) => {
  return (
    <QwikUIAccordionContent
      {...props}
      class={cn(
        'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm',
        props.class,
      )}
    >
      <div class="pb-4 pt-0">
        <Slot />
      </div>
    </QwikUIAccordionContent>
  );
});

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent };
