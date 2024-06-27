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
import { useMergedRef } from '../../hooks/merge-refs';

export type HComboboxItemProps = PropsOf<'div'> & {
  /** Internal index we get from the inline component. Please see combobox-inline.tsx */
  _index?: number;

  /** If true, item is not selectable or focusable. */
  disabled?: boolean;

  /** Selected value associated with the item. */
  value?: string;
};

export const HComboboxItem = component$(({ _index, ...rest }: HComboboxItemProps) => {
  if (_index === undefined) {
    throw new Error('Qwik UI: Combobox component item cannot find its proper index.');
  }

  const context = useContext(comboboxContextId);
  const itemRef = useMergedRef(rest.ref);
  const itemLabelId = `${context.localId}-${_index}-item-label`;

  const { selectionManager$, filterManager$ } = useCombobox();
  const isDisabledSig = useComputed$(() => context.disabledIndexSetSig.value.has(_index));
  const isSelectedSig = useComputed$(() => {
    const index = _index ?? null;
    return !isDisabledSig.value && context.selectedIndexSetSig.value.has(index);
  });

  const isHighlightedSig = useComputed$(() => {
    if (isDisabledSig.value) return;

    if (context.highlightedIndexSig.value === _index) {
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

      if (!containerRect || !itemRect) return;

      // Calculates the offset to center the item within the container
      const offset =
        itemRect.top - containerRect.top - containerRect.height / 2 + itemRect.height / 2;

      context.panelRef.value?.scrollBy({ top: offset, ...context.scrollOptions });
    }
  });

  const handleClick$ = $(async () => {
    if (isDisabledSig.value || _index === null) return;

    await selectionManager$(_index, 'toggle');

    if (!isSelectedSig.value && !context.multiple) {
      context.isListboxOpenSig.value = false;
    }
  });

  const handlePointerOver$ = $(() => {
    if (isDisabledSig.value) return;

    if (_index !== null) {
      context.highlightedIndexSig.value = _index;
    }
  });

  const handleFocus$ = $(() => {
    context.inputRef.value?.focus();
  });

  const itemContext: ComboboxItemContext = {
    isSelectedSig,
    itemLabelId,
  };

  useContextProvider(comboboxItemContextId, itemContext);

  useTask$(async function navigationTask({ track, cleanup }) {
    track(() => context.highlightedIndexSig.value);

    if (isServer || !context.panelRef.value) return;
    if (_index !== context.highlightedIndexSig.value) return;

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

    if (context.inputValueSig.value === '') {
      context.selectedIndexSetSig.value = new Set<number>();
    } else {
      context.isListboxOpenSig.value = true;
    }

    let isVisible;
    const displayValue = context.itemsMapSig.value.get(_index)?.displayValue;
    if (!displayValue) return;
    if (context.filter$) {
      isVisible = await context.filter$(displayValue, context.inputValueSig.value);
    } else {
      const lowerCaseDisplayValue = displayValue?.toLowerCase();
      const lowerCaseInputValue = context.inputValueSig.value.toLowerCase();
      isVisible = lowerCaseDisplayValue?.includes(lowerCaseInputValue);
    }

    filterManager$(!!isVisible, itemRef, _index);
  });

  return (
    <div
      role="option"
      ref={itemRef}
      tabIndex={-1}
      id={`${context.localId}-${_index}`}
      aria-selected={isSelectedSig.value}
      aria-disabled={isDisabledSig.value === true ? 'true' : 'false'}
      data-disabled={isDisabledSig.value ? '' : undefined}
      data-selected={isSelectedSig.value ? '' : undefined}
      data-highlighted={isHighlightedSig.value ? '' : undefined}
      onPointerOver$={[handlePointerOver$, rest.onPointerOver$]}
      onFocus$={[handleFocus$, rest.onFocus$]}
      aria-labelledby={itemLabelId}
      data-item
      onClick$={handleClick$}
      {...rest}
    >
      <Slot />
    </div>
  );
});
