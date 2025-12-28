import { PropsOf, Slot, component$ } from '@qwik.dev/core';
import { HCollapsibleContent } from '../collapsible/collapsible-content';

export const HAccordionContent = component$(
  (props: PropsOf<typeof HCollapsibleContent>) => {
    return (
      <HCollapsibleContent role="region" {...props}>
        <Slot />
      </HCollapsibleContent>
    );
  },
);
