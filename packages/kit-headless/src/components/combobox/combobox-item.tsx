import {
  PropsOf,
  Slot,
  component$,
  $,
  useContext,
  useTask$,
  useComputed$,
  useContextProvider,
} from '@builder.io/qwik';
import {
  ComboboxItemContext,
  comboboxContextId,
  comboboxItemContextId,
} from './combobox-context';
import { useCombobox } from './use-combobox';
import { isServer } from '@builder.io/qwik/build';
import { useCombinedRef } from '../../hooks/combined-refs';

export type HComboboxItemProps = PropsOf<'div'> & {
  /** Internal index we get from the inline component. Please see combobox-inline.tsx */
  _index?: number;

  /** If true, item is not selectable or focusable. */
  disabled?: boolean;

  /** Selected value associated with the item. */
  value?: string;
};

export const HComboboxItem = component$((props: HComboboxItemProps) => {
  if (props._index === undefined) {
    throw new Error('Qwik UI: Combobox component item cannot find its proper index.');
  }

  const context = useContext(comboboxContextId);
  const itemRef = useCombinedRef(props.ref);
  const itemLabelId = `${context.localId}-${props._index ?? -1}-item-label`;

  const { selectionManager$, filterManager$ } = useCombobox();
  const isDisabledSig = useComputed$(() =>
    context.disabledIndexSetSig.value.has(props._index ?? -1),
  );
  const isSelectedSig = useComputed$(() => {
    const index = props._index ?? -1;
    const selectedValue = context.itemsMapSig.value.get(index)?.value;
    return !isDisabledSig.value && context.selectedValueSetSig.value.has(selectedValue!);
  });

  const isHighlightedSig = useComputed$(() => {
    if (isDisabledSig.value) return;

    if (context.highlightedIndexSig.value === props._index ?? -1) {
      return true;
    } else {
      return false;
    }
  });

  const checkVisibility$ = $(async (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;

    if (isHighlightedSig.value && !entry.isIntersecting) {
      const containerRect = context.panelRef.value?.getBoundingClientRect();
      const itemRect = itemRef.value?.getBoundingClientRect();

      if (!containerRect || !itemRect || context.isMouseOverPopupSig.value) return;

      // Calculates the offset to center the item within the container
      const offset =
        itemRect.top - containerRect.top - containerRect.height / 2 + itemRect.height / 2;

      context.panelRef.value?.scrollBy({
        top: document.hasFocus() ? offset : undefined,
        ...context.scrollOptions,
      });
    }
  });

  const handleClick$ = $(async () => {
    if (isDisabledSig.value || (props._index ?? -1) === null) return;

    await selectionManager$(props._index ?? -1, 'toggle');

    if (!isSelectedSig.value && !context.multiple) {
      context.isListboxOpenSig.value = false;
    }
  });

  const handlePointerOver$ = $(() => {
    if (isDisabledSig.value) return;

    if (props._index !== undefined && context.isMouseOverPopupSig.value) {
      context.highlightedIndexSig.value = props._index ?? -1;
    }
  });

  const handleFocus$ = $(() => {
    context.inputRef.value?.focus();
  });

  const itemContext: ComboboxItemContext = {
    isSelectedSig,
    itemLabelId,
    _index: props._index,
  };

  useContextProvider(comboboxItemContextId, itemContext);

  useTask$(async function navigationTask({ track, cleanup }) {
    track(() => context.highlightedIndexSig.value);

    if (isServer || !context.panelRef.value) return;
    if (props._index !== context.highlightedIndexSig.value) return;

    const hasScrollbar =
      context.panelRef.value.scrollHeight > context.panelRef.value.clientHeight;

    if (!hasScrollbar) {
      return;
    }

    const observer = new IntersectionObserver(checkVisibility$, {
      root: context.panelRef.value,
      threshold: 1.0,
    });

    cleanup(() => observer?.disconnect());

    if (itemRef.value) {
      observer.observe(itemRef.value);
    }
  });

  useTask$(async ({ track }) => {
    track(() => context.inputValueSig.value);

    if (isServer || !itemRef.value) return;

    if (context.inputValueSig.value === '' && !context.multiple) {
      context.selectedValueSetSig.value = new Set<string>();
    } else {
      context.isListboxOpenSig.value = true;
    }

    let isVisible;
    const displayValue = context.itemsMapSig.value.get(props._index ?? -1)?.displayValue;
    if (!displayValue) return;
    if (context.filter) {
      const lowerCaseDisplayValue = displayValue?.toLowerCase();
      const lowerCaseInputValue = context.inputValueSig.value.toLowerCase();
      isVisible = lowerCaseDisplayValue?.includes(lowerCaseInputValue);
      filterManager$(!!isVisible, itemRef, props._index ?? -1);
    }
  });

  useTask$(({ track }) => {
    track(() => context.isListboxOpenSig.value);

    if (context.isListboxOpenSig.value) {
      context.initialLoadSig.value = false;
    }
  });

  return (
    <div
      role="option"
      ref={itemRef}
      tabIndex={-1}
      id={`${context.localId}-${props._index ?? -1}`}
      aria-selected={isSelectedSig.value}
      aria-disabled={isDisabledSig.value === true ? 'true' : 'false'}
      data-disabled={isDisabledSig.value ? '' : undefined}
      data-selected={isSelectedSig.value ? '' : undefined}
      data-highlighted={isHighlightedSig.value ? '' : undefined}
      onPointerOver$={[handlePointerOver$, props.onPointerOver$]}
      onFocus$={[handleFocus$, props.onFocus$]}
      aria-labelledby={itemLabelId}
      data-item
      onClick$={handleClick$}
      {...props}
    >
      <Slot />
    </div>
  );
});
