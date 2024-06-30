import { PropsOf, Slot, component$ } from '@builder.io/qwik';
import { HCollapsibleContent } from '../collapsible/collapsible-content';

/// here's a commit

export const HAccordionContent = component$(
  (props: PropsOf<typeof HCollapsibleContent>) => {
    return (
      <HCollapsibleContent role="region" {...props}>
        <Slot />
      </HCollapsibleContent>
    );
  },
);
