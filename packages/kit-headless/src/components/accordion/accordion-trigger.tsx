import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { HCollapsibleTrigger } from '../collapsible/collapsible-trigger';
import { accordionContextId, accordionItemContextId } from './accordion-context';

export const HAccordionTrigger = component$(
  (props: PropsOf<typeof HCollapsibleTrigger>) => {
    const context = useContext(accordionContextId);
    const itemContext = useContext(accordionItemContextId);

    return (
      <HCollapsibleTrigger
        onClick$={() => {
          context.selectedIndexSig.value = itemContext.localIndexSig.value;
        }}
        {...props}
      >
        <Slot />
      </HCollapsibleTrigger>
    );
  },
);
