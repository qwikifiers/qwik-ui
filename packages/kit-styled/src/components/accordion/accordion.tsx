import { component$, Slot } from '@builder.io/qwik';

import {
  AccordionContent as QwikUIAccordionContent,
  AccordionHeader as QwikUIAccordionHeader,
  AccordionItem as QwikUIAccordionItem,
  AccordionRoot as QwikUIAccordionRoot,
  AccordionTrigger as QwikUIAccordionTrigger,
  type AccordionHeaderProps,
  type AccordionItemProps,
  type AccordionRootProps,
  type AccordionTriggerProps,
} from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

import { LuChevronDown } from '@qwikest/icons/lucide';

/* TODO:

  * Implement 2 variants - "light", "bordered" (and "Splitted"?)
  * Implement shorthand version in headless and provide custom components ability
  * Ask Jack about the "Header" / "Trigger" separation

  RFC: Verbose API vs Simpler API
      
*/

const Accordion = component$<AccordionRootProps>((props) => (
  <QwikUIAccordionRoot animated {...props} class={props.class}>
    <Slot />
  </QwikUIAccordionRoot>
));

/*

  <Accordion>
    <AccordionItem label="">Bla bla</AccordionItem>
    <AccordionItem label="My Stuff">Bla bla</AccordionItem>
  </Accordion>

  <Accordion>
    <AccordionItem>
      <AccordionHeader>My Stuff</AccordionHeader>
      <AccordionContent> Bla bla</AccordionContent>
     </AccordionItem>
    <AccordionItem label="My Stuff"> Bla bla</AccordionItem>
  </Accordion>

*/

// -------- Verbose version

const AccordionItem = component$<AccordionItemProps>((props) => {
  return (
    <QwikUIAccordionItem {...props} class={cn('border-b', props.class)}>
      <Slot />
    </QwikUIAccordionItem>
  );
});

const AccordionTrigger = component$<
  AccordionTriggerProps & { header?: AccordionHeaderProps['as'] }
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
        <LuChevronDown class="text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200" />
      </QwikUIAccordionTrigger>
    </QwikUIAccordionHeader>
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

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
