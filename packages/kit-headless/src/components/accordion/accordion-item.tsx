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
  ({
    id,
    _index,
    value,
    open = false,
    ...props
  }: AccordionItemProps & InternalAccordionItemProps) => {
    const context = useContext(accordionContextId);
    const localId = useId();
    const itemId = id ?? localId + '-item';
    const isOpenSig = useSignal<boolean>(open);
    const localIndexSig = useSignal<number>(_index!);

    useTask$(function internalState({ track }) {
      track(() => context.selectedIndexSig.value);

      if (context.multiple || isServer) return;

      if (context.selectedIndexSig.value !== localIndexSig.value) {
        isOpenSig.value = false;
      }
    });

    useTask$(function givenReactiveValue({ track }) {
      track(() => context.givenValueSig?.value);

      if (!context.givenValueSig) return;

      if (context.givenValueSig?.value === value) {
        isOpenSig.value = true;
      } else {
        isOpenSig.value = false;
      }
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
