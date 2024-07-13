import {
  $,
  Slot,
  component$,
  useComputed$,
  useContext,
  useSignal,
  useTask$,
  type PropsOf,
  useContextProvider,
  sync$,
  useOnWindow,
  QRL,
} from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import SelectContextId, {
  SelectItemContext,
  selectItemContextId,
} from './select-context';
import { useSelect } from './use-select';
import { useCombinedRef } from '../../hooks/combined-refs';

export type SelectItemProps = PropsOf<'div'> & {
  /** Internal index we get from the inline component. Please see select-inline.tsx */
  _index?: number;

  /** If true, item is not selectable or focusable. */
  disabled?: boolean;

  /** Selected value associated with the item. */
  value?: string;
};

export const HSelectItem = component$<SelectItemProps>((props) => {
  /* look at select-inline on how we get the index. */
  const { _index, disabled, ...rest } = props;
  const context = useContext(SelectContextId);
  const itemRef = useCombinedRef(props.ref);
  const localIndexSig = useSignal<number | null>(null);
  const itemId = `${context.localId}-${_index}`;
  const typeaheadFnSig = useSignal<QRL<(key: string) => Promise<void>>>();

  const { selectionManager$, getNextEnabledItemIndex$, getPrevEnabledItemIndex$ } =
    useSelect();

  // we're getting the same function instance from the trigger, without needing to restructure context
  useOnWindow(
    'typeaheadFn',
    $((e: CustomEvent) => {
      typeaheadFnSig.value = e.detail;
    }),
  );

  const isSelectedSig = useComputed$(() => {
    const index = _index ?? null;
    return !disabled && context.selectedIndexSetSig.value.has(index!);
  });

  const isHighlightedSig = useComputed$(() => {
    if (disabled) return;

    if (context.highlightedIndexSig.value === _index) {
      itemRef.value?.focus();
      return true;
    } else {
      return false;
    }
  });

  useTask$(async function getIndexTask() {
    if (_index === undefined)
      throw Error('Qwik UI: Select component item cannot find its proper index.');

    localIndexSig.value = _index;
  });

  const checkVisibility$ = $(async (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;

    if (isHighlightedSig.value && !entry.isIntersecting) {
      const containerRect = context.popoverRef.value?.getBoundingClientRect();
      const itemRect = itemRef.value?.getBoundingClientRect();

      if (!containerRect || !itemRect) return;

      // Calculates the offset to center the item within the container
      const offset =
        itemRect.top - containerRect.top - containerRect.height / 2 + itemRect.height / 2;

      context.popoverRef.value?.scrollBy({ top: offset, ...context.scrollOptions });
    }
  });

  useTask$(async function navigationTask({ track, cleanup }) {
    track(() => context.highlightedIndexSig.value);

    // update the context with the highlighted item ref
    if (localIndexSig.value === context.highlightedIndexSig.value) {
      context.highlightedItemRef = itemRef;
    }

    if (isServer || !context.popoverRef.value) return;
    if (_index !== context.highlightedIndexSig.value) return;

    const hasScrollbar =
      context.popoverRef.value.scrollHeight > context.popoverRef.value.clientHeight;

    if (!hasScrollbar) {
      return;
    }

    const observer = new IntersectionObserver(checkVisibility$, {
      root: context.popoverRef.value,
      threshold: 1.0,
    });

    cleanup(() => observer?.disconnect());

    if (itemRef.value) {
      observer.observe(itemRef.value);
    }
  });

  const handleClick$ = $(async () => {
    if (disabled || localIndexSig.value === null) return;

    if (context.multiple) {
      await selectionManager$(localIndexSig.value, 'toggle');

      // keep focus so that when pressing escape, the listbox closes even when clicking.
      context.triggerRef.value?.focus();
    } else {
      await selectionManager$(localIndexSig.value, 'add');
      context.isListboxOpenSig.value = false;
    }
  });

  const handlePointerOver$ = $(() => {
    if (disabled) return;

    if (localIndexSig.value !== null) {
      context.highlightedIndexSig.value = localIndexSig.value;
    }
  });

  const selectContext: SelectItemContext = {
    isSelectedSig,
  };

  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    const keys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowRight',
      'ArrowLeft',
      'Home',
      'End',
      'PageDown',
      'PageUp',
      'Enter',
      ' ',
    ];
    if (keys.includes(e.key)) {
      e.preventDefault();
    }
  });

  const handleKeyDown$ = $(async (e: KeyboardEvent) => {
    typeaheadFnSig.value?.(e.key);

    switch (e.key) {
      case 'ArrowDown':
        if (context.isListboxOpenSig.value) {
          context.highlightedIndexSig.value = await getNextEnabledItemIndex$(
            context.highlightedIndexSig.value!,
          );
          if (context.multiple && e.shiftKey) {
            await selectionManager$(context.highlightedIndexSig.value, 'toggle');
          }
        }
        break;

      case 'ArrowUp':
        if (context.isListboxOpenSig.value) {
          context.highlightedIndexSig.value = await getPrevEnabledItemIndex$(
            context.highlightedIndexSig.value!,
          );
          if (context.multiple && e.shiftKey) {
            await selectionManager$(context.highlightedIndexSig.value, 'toggle');
          }
        }
        break;

      case 'Home':
        if (context.isListboxOpenSig.value) {
          context.highlightedIndexSig.value = await getNextEnabledItemIndex$(-1);
        }
        break;

      case 'End':
        if (context.isListboxOpenSig.value) {
          const lastEnabledOptionIndex = await getPrevEnabledItemIndex$(
            context.itemsMapSig.value.size,
          );
          context.highlightedIndexSig.value = lastEnabledOptionIndex;
        }
        break;

      case 'Escape':
        context.triggerRef.value?.focus();
        context.isListboxOpenSig.value = false;
        break;

      case 'Tab':
        context.isListboxOpenSig.value = false;
        break;

      case 'Enter':
      case ' ':
        if (context.isListboxOpenSig.value) {
          const action = context.multiple ? 'toggle' : 'add';
          await selectionManager$(context.highlightedIndexSig.value, action);

          if (!context.multiple) {
            context.triggerRef.value?.focus();
          }
        }
        context.isListboxOpenSig.value = context.multiple
          ? true
          : !context.isListboxOpenSig.value;
        break;

      case 'a':
        if (e.ctrlKey && context.multiple) {
          for (const [index, item] of context.itemsMapSig.value) {
            if (!item.disabled) {
              await selectionManager$(index, 'add');
            }
          }
        }
        break;
    }
  });

  useContextProvider(selectItemContextId, selectContext);

  return (
    <div
      {...rest}
      id={itemId}
      onClick$={[handleClick$, props.onClick$]}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      onPointerOver$={[handlePointerOver$, props.onPointerOver$]}
      ref={itemRef}
      tabIndex={-1}
      aria-selected={isSelectedSig.value}
      aria-disabled={disabled === true ? 'true' : 'false'}
      data-selected={isSelectedSig.value ? '' : undefined}
      data-highlighted={isHighlightedSig.value ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      data-item
      role="option"
    >
      <Slot />
    </div>
  );
});
