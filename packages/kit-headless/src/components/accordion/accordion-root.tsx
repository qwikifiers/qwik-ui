import {
  Signal,
  Slot,
  component$,
  useComputed$,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import { AccordionRootProps } from './accordion-inline';
import { accordionContextId } from './accordion-context';

export const HAccordionRootImpl = component$((props: AccordionRootProps) => {
  const {
    multiple,
    'bind:value': givenValueSig,
    initialIndex,
    onChange$,
    itemsMap,
    ...rest
  } = props;

  itemsMap;

  const selectedIndexSig = useSignal<number>(initialIndex ?? -1);
  const triggerRefsArray = useSignal<Array<Signal>>([]);

  const itemsMapSig = useComputed$(() => {
    return props.itemsMap!;
  });

  const context = {
    selectedIndexSig,
    givenValueSig,
    multiple,
    initialIndex,
    onChange$,
    itemsMapSig,
    triggerRefsArray,
  };

  useContextProvider(accordionContextId, context);

  return (
    <div {...rest} data-accordion>
      <Slot />
    </div>
  );
});
