/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { $, useComputed$, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';

import { DropdownItemProps } from './dropdown-item';
import { dropdownContextId } from './dropdown-context';
import { useDropdown } from './use-dropdown';

type useDropdownItemProps = { onItemSelect?: () => void } & Pick<
  DropdownItemProps,
  '_index' | 'disabled' | 'closeOnSelect'
>;

/**
 * Helper functions go inside of hooks.
 * This is because outside of the component$ boundary Qwik core wakes up, or at least this was once a problem.
 */
export function useDropdownItem(props: useDropdownItemProps) {
  const context = useContext(dropdownContextId);
  const { getNextEnabledItemIndex$, getPrevEnabledItemIndex$ } = useDropdown();
  const { _index, disabled, closeOnSelect = true } = props;

  const itemRef = useSignal<HTMLLIElement>();
  const localIndexSig = useSignal<number | null>(null);
  const itemId = `${context.localId}-${_index}`;

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
      throw Error('Qwik UI: Dropdown component item cannot find its proper index.');

    localIndexSig.value = _index;
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

  useTask$(async function navigationTask({ track, cleanup }) {
    track(() => context.highlightedIndexSig.value);

    if (isServer || !context.panelRef.value) return;
    if (props._index !== context.highlightedIndexSig.value) return;
    context.highlightedItemRef = itemRef;

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

  const handleClick$ = $(async () => {
    if (disabled || localIndexSig.value === null) return;

    props.onItemSelect?.();

    if (closeOnSelect) {
      context.isOpenSig.value = false;
      context.triggerRef.value?.focus();
    }
  });

  const handlePointerOver$ = $(() => {
    if (disabled) return;

    if (localIndexSig.value !== null) {
      context.highlightedIndexSig.value = localIndexSig.value;
    }
  });

  const handleKeyDown$ = $(async (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        if (context.isOpenSig.value) {
          context.highlightedIndexSig.value = await getNextEnabledItemIndex$(
            context.highlightedIndexSig.value!,
          );
        }
        break;

      case 'ArrowUp':
        if (context.isOpenSig.value) {
          context.highlightedIndexSig.value = await getPrevEnabledItemIndex$(
            context.highlightedIndexSig.value!,
          );
        }
        break;

      case 'Home':
        if (context.isOpenSig.value) {
          context.highlightedIndexSig.value = await getNextEnabledItemIndex$(-1);
        }
        break;

      case 'End':
        if (context.isOpenSig.value) {
          const lastEnabledOptionIndex = await getPrevEnabledItemIndex$(
            context.itemsMapSig.value.size,
          );
          context.highlightedIndexSig.value = lastEnabledOptionIndex;
        }
        break;

      case 'Escape':
        context.triggerRef.value?.focus();
        context.isOpenSig.value = false;
        break;

      case 'Tab':
        context.isOpenSig.value = false;
        break;

      case 'Enter':
      case ' ':
        if (context.isOpenSig.value) {
          props.onItemSelect?.();

          if (closeOnSelect) {
            context.isOpenSig.value = false;
            context.triggerRef.value?.focus();
          }
        }
        break;
    }
  });

  return {
    handleKeyDown$,
    handleClick$,
    handlePointerOver$,
    itemId,
    itemRef,
    isHighlightedSig,
  };
}
