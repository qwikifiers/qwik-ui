import {
  PropsOf,
  Slot,
  component$,
  useContext,
  useContextProvider,
  useId,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { HCollapsible } from '../collapsible/collapsible';
import { accordionContextId, accordionItemContextId } from './accordion-context';
import { isServer } from '@builder.io/qwik/build';

type InternalAccordionItemProps = {
  _index?: number;
};

type AccordionItemProps = PropsOf<typeof HCollapsible> & {
  open?: boolean;
  value?: string;
};

export const HAccordionItem = component$(
  ({ id, _index, value, ...props }: AccordionItemProps & InternalAccordionItemProps) => {
    const context = useContext(accordionContextId);
    const localId = useId();
    const itemId = id ?? localId + '-item';
    const localIndexSig = useSignal<number>(_index!);
    const isOpenSig = useSignal<boolean>(context.initialIndex === localIndexSig.value);
    const initialLoadSig = useSignal<boolean>(true);

    useTask$(function internalState({ track }) {
      track(() => context.selectedIndexSig.value);

      if (context.multiple || isServer) return;

      if (context.selectedIndexSig.value !== localIndexSig.value) {
        isOpenSig.value = false;
      } else {
        // onChange$ behavior - called once when the value changes
        if (!initialLoadSig.value && value && context.onChange$) {
          context.onChange$(value);
        }

        // update the given bind:value signal if the value prop is set
        if (!context.givenValueSig) return;
        context.givenValueSig.value = value ?? null;
      }
    });

    useTask$(function givenReactiveValue({ track }) {
      if (!context.givenValueSig) return;
      track(() => context.givenValueSig?.value);

      if (context.givenValueSig?.value === value) {
        isOpenSig.value = true;

        // fixes syncing the selected index when a bind:value signal is updated
        context.selectedIndexSig.value = localIndexSig.value;
      } else {
        isOpenSig.value = false;
      }
    });

    useTask$(() => {
      initialLoadSig.value = false;
    });

    const itemContext = {
      isOpenSig,
      localIndexSig,
    };

    useContextProvider(accordionItemContextId, itemContext);

    return (
      <HCollapsible bind:open={isOpenSig} id={itemId} {...props}>
        <Slot />
      </HCollapsible>
    );
  },
);
