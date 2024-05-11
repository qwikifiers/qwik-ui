import { component$, Slot, PropsOf } from '@builder.io/qwik';

import { Accordion } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

import { LuChevronDown } from '@qwikest/icons/lucide';

const AccordionRoot = component$<PropsOf<typeof Accordion.Root>>((props) => (
  <Accordion.Root animated {...props}>
    <Slot />
  </Accordion.Root>
));

const AccordionItem = component$<PropsOf<typeof Accordion.Item>>((props) => {
  return (
    <Accordion.Item {...props} class={cn('border-b', props.class)}>
      <Slot />
    </Accordion.Item>
  );
});

const AccordionTrigger = component$<
  PropsOf<typeof Accordion.Trigger> & {
    header?: PropsOf<typeof Accordion.Header>['as'];
  }
>(({ header = 'h3', ...props }) => {
  return (
    <Accordion.Header as={header} class="flex">
      <Accordion.Trigger
        {...props}
        class={cn(
          'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
          props.class,
        )}
      >
        <Slot />
        <LuChevronDown class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </Accordion.Trigger>
    </Accordion.Header>
  );
});

const AccordionContent = component$<PropsOf<typeof Accordion.Content>>((props) => {
  return (
    <Accordion.Content
      {...props}
      class={cn(
        'overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        props.class,
      )}
    >
      <div class="pb-4 pt-0">
        <Slot />
      </div>
    </Accordion.Content>
  );
});

export {
  AccordionRoot as Root,
  AccordionItem as Item,
  AccordionTrigger as Trigger,
  AccordionContent as Content,
};
