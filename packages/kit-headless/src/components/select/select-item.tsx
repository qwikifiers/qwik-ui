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
} from '@builder.io/qwik';
import { isServer, isBrowser } from '@builder.io/qwik/build';
import SelectContextId, {
  SelectItemContext,
  selectItemContextId,
} from './select-context';
import { useSelect } from './use-select';

export type SelectItemProps = PropsOf<'li'> & {
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
  const itemRef = useSignal<HTMLLIElement>();
  const localIndexSig = useSignal<number | null>(null);
  const itemId = `${context.localId}-${_index}`;
  const isInitialFocusSig = useSignal<boolean>(true);

  const { selectionManager$, getNextEnabledItemIndex$, getPrevEnabledItemIndex$ } =
    useSelect();

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

    // update the context with the first enabled item ref
    const firstEnabledIndex = await getNextEnabledItemIndex$(-1);
    if (localIndexSig.value === firstEnabledIndex) {
      context.firstEnabledItemRef = itemRef;
    }
  });

  useTask$(async function scrollableTask({ track, cleanup }) {
    track(() => context.highlightedIndexSig.value);

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
        root: context.listboxRef.value,
        threshold: 1.0,
      });

      if (itemRef.value) {
        observer.observe(itemRef.value);
      }
    }

    if (!isInitialFocusSig.value) return;
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

      case 'Tab':
      case 'Escape':
        context.isListboxOpenSig.value = false;
        break;
    }
  });

  useContextProvider(selectItemContextId, selectContext);

  return (
    <li
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
      data-item={_index}
      role="option"
    >
      <Slot />
    </li>
  );
});
