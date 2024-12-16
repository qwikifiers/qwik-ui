import {
  PropsOf,
  Slot,
  component$,
  $,
  useContext,
  useTask$,
  useComputed$,
  useContextProvider,
  useSignal,
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
  const context = useContext(comboboxContextId);
  const debounceTimeoutSig = useSignal<NodeJS.Timeout>();

  if (props._index === undefined) {
    throw new Error('Qwik UI: Combobox component item cannot find its proper index.');
  }

  const localIndexSig = useComputed$(() => props._index ?? -1);
  const itemRef = useCombinedRef(props.ref);

  const { selectionManager$, filterManager$ } = useCombobox();

  const itemLabelId = `${context.localId}-${localIndexSig.value}-item-label`;

  const isDisabledSig = useComputed$(() =>
    context.disabledIndexSetSig.value.has(localIndexSig.value),
  );
  const isSelectedSig = useComputed$(() => {
    const index = localIndexSig.value;
    const selectedValue = context.itemsMapSig.value.get(index)?.value;
    if (!selectedValue || isDisabledSig.value) return false;

    if (Array.isArray(context.selectedValuesSig.value)) {
      return context.selectedValuesSig.value.includes(selectedValue);
    } else {
      return context.selectedValuesSig.value === selectedValue;
    }
  });

  const isHighlightedSig = useComputed$(() => {
    if (isDisabledSig.value) return;

    if (context.highlightedIndexSig.value === localIndexSig.value) {
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

      if (!containerRect || !itemRect || !context.isKeyboardFocusSig.value) return;

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
    if (isDisabledSig.value || localIndexSig.value === null) return;

    await selectionManager$(localIndexSig.value, 'toggle');

    if (!isSelectedSig.value && !context.multiple) {
      context.isListboxOpenSig.value = false;
    }
  });

  const handlePointerOver$ = $(() => {
    if (isDisabledSig.value) return;

    if (
      props._index !== undefined &&
      (context.isMouseOverPopupSig.value || context.mode === 'inline')
    ) {
      context.highlightedIndexSig.value = localIndexSig.value;
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

  useTask$(function handleScrolling({ track, cleanup }) {
    track(() => context.highlightedIndexSig.value);

    if (isServer || !context.panelRef.value) return;

    const hasScrollbar =
      context.panelRef.value.scrollHeight > context.panelRef.value.clientHeight;

    if (!hasScrollbar) return;

    if (debounceTimeoutSig.value !== undefined) {
      clearTimeout(debounceTimeoutSig.value);
    }

    debounceTimeoutSig.value = setTimeout(() => {
      if (props._index !== context.highlightedIndexSig.value) return;

      const observer = new IntersectionObserver(checkVisibility$, {
        root: context.panelRef.value,
        threshold: 1.0,
      });

      cleanup(() => observer?.disconnect());

      if (itemRef.value) {
        observer.observe(itemRef.value);
      }
    }, 100);

    cleanup(() => {
      if (debounceTimeoutSig.value !== undefined) {
        clearTimeout(debounceTimeoutSig.value);
      }
    });
  });

  useTask$(async function defaultFilter({ track }) {
    track(() => context.inputValueSig.value);

    if (isServer || !itemRef.value) return;

    const displayValue = context.itemsMapSig.value.get(localIndexSig.value)?.displayValue;

    let isVisible;
    if (!displayValue) return;
    if (context.filter) {
      const lowerCaseDisplayValue = displayValue?.toLowerCase();
      const lowerCaseInputValue = context.inputValueSig.value.toLowerCase();
      isVisible = lowerCaseDisplayValue?.includes(lowerCaseInputValue);
      filterManager$(!!isVisible, itemRef, localIndexSig.value);
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
      id={`${context.localId}-${localIndexSig.value}`}
      aria-selected={isSelectedSig.value}
      aria-disabled={isDisabledSig.value === true ? 'true' : 'false'}
      data-disabled={isDisabledSig.value ? '' : undefined}
      data-selected={isSelectedSig.value ? '' : undefined}
      data-highlighted={isHighlightedSig.value ? '' : undefined}
      onPointerOver$={[handlePointerOver$, props.onPointerOver$]}
      onFocus$={[handleFocus$, props.onFocus$]}
      aria-labelledby={itemLabelId}
      data-item
      onClick$={[handleClick$, props.onClick$]}
      {...props}
    >
      <Slot />
    </div>
  );
});
