/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
  $,
  PropsOf,
  QRL,
  Slot,
  component$,
  sync$,
  useComputed$,
  useContext,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { isBrowser, isServer } from '@builder.io/qwik/build';

import { dropdownContextId } from './dropdown-context';
import { useDropdown } from './use-dropdown';

export type DropdownItemProps = {
  /** Internal index we get from the inline component. Please see dropdown-inline.tsx */
  _index?: number;

  /** If true, item is not selectable or focusable. */
  disabled?: boolean;

  /** If true, dropdown will close after selecting the item. */
  closeOnSelect?: boolean;

  /**
   * QRL handler that runs when the user selects an item.
   */
  onSelect$?: QRL<() => void>;
} & PropsOf<'div'>;

export const HDropdownItem = component$((props: DropdownItemProps) => {
  /* look at dropdown-inline on how we get the index. */
  const { _index, disabled, closeOnSelect = true, ...rest } = props;
  const context = useContext(dropdownContextId);
  const itemRef = useSignal<HTMLLIElement>();
  const localIndexSig = useSignal<number | null>(null);
  const itemId = `${context.localId}-${_index}`;

  const { getNextEnabledItemIndex$, getPrevEnabledItemIndex$ } = useDropdown();

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

  useTask$(async function navigationTask({ track, cleanup }) {
    track(() => context.highlightedIndexSig.value);

    // update the context with the highlighted item ref
    if (localIndexSig.value === context.highlightedIndexSig.value) {
      context.highlightedItemRef = itemRef;
    }

    if (isServer) return;

    let observer: IntersectionObserver;

    const checkVisibility = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      // if the is not visible, scroll it into view
      if (isHighlightedSig.value && !entry.isIntersecting) {
        itemRef.value?.scrollIntoView(context.scrollOptions);
      }
    };

    cleanup(() => observer?.disconnect());

    if (isBrowser) {
      observer = new IntersectionObserver(checkVisibility, {
        root: context.contentRef.value,
        threshold: 1.0,
      });

      if (itemRef.value) {
        observer.observe(itemRef.value);
      }
    }
  });

  const handleSelect$ = $(() => {
    props.onSelect$?.();

    if (closeOnSelect) {
      context.isOpenSig.value = false;
      context.triggerRef.value?.focus();
    }
  });

  const handleClick$ = $(async () => {
    if (disabled || localIndexSig.value === null) return;

    handleSelect$();
  });

  const handlePointerOver$ = $(() => {
    if (disabled) return;

    if (localIndexSig.value !== null) {
      context.highlightedIndexSig.value = localIndexSig.value;
    }
  });

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
          handleSelect$();
        }
        break;
    }
  });

  return (
    <div
      role="menuitem"
      {...rest}
      tabIndex={-1}
      id={itemId}
      onClick$={[handleClick$, props.onClick$]}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      onPointerOver$={[handlePointerOver$, props.onPointerOver$]}
      ref={itemRef}
      aria-disabled={disabled === true ? 'true' : 'false'}
      data-disabled={disabled}
      data-highlighted={isHighlightedSig.value}
      data-menu-item
    >
      <Slot />
    </div>
  );
});
