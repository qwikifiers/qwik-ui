import {
  PropsOf,
  Slot,
  component$,
  useComputed$,
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

    // gets the index dynamically
    const localIndexSig = useComputed$(() => {
      return _index ?? -1;
    });

    const isOpenSig = useSignal<boolean>(context.initialIndex === localIndexSig.value);
    const initialLoadSig = useSignal<boolean>(true);
    const triggerRef = useSignal<HTMLButtonElement>(null as unknown as HTMLButtonElement);

    useTask$(function internalState({ track }) {
      track(() => context.selectedIndexSig.value);

      if (context.isMultipleSig.value || isServer) return;

      if (context.selectedIndexSig.value !== localIndexSig.value) {
        isOpenSig.value = false;
      } else {
        // never executes when first item is opened, then new item added, then new first item opened

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

    useTask$(({ track }) => {
      track(() => localIndexSig.value);

      // collect trigger refs for keyboard navigation
      context.triggerRefsArray.value[localIndexSig.value] = triggerRef;

      // update selected index when new are added and the item is opened
      track(() => isOpenSig.value);
      if (isOpenSig.value) {
        context.selectedIndexSig.value = localIndexSig.value;
      }
    });

    useTask$(() => {
      initialLoadSig.value = false;
    });

    const itemContext = {
      isOpenSig,
      localIndexSig,
      triggerRef,
    };

    useContextProvider(accordionItemContextId, itemContext);

    return (
      <HCollapsible
        triggerRef={triggerRef}
        bind:open={isOpenSig}
        id={itemId}
        disabled={context.disabled || props.disabled}
        collapsible={context.collapsible}
        accordionItem
        animated={context.isAnimatedSig.value}
        {...props}
      >
        <Slot />
      </HCollapsible>
    );
  },
);
