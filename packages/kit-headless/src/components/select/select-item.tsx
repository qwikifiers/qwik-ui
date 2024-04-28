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
} from '@builder.io/qwik';
import { isServer, isBrowser } from '@builder.io/qwik/build';
import SelectContextId, {
  SelectOptionContext,
  selectOptionContextId,
} from './select-context';
import { useSelect } from './use-select';

export type SelectOptionProps = PropsOf<'li'> & {
  /** Internal index we get from the inline component. Please see select-inline.tsx */
  _index?: number;

  /** If true, option is not selectable or focusable. */
  disabled?: boolean;

  /** Selected value associated with the option. */
  value?: string;
};

export const SelectItem = component$<SelectOptionProps>((props) => {
  /* look at select-inline on how we get the index. */
  const { _index, disabled, ...rest } = props;
  const context = useContext(SelectContextId);
  const optionRef = useSignal<HTMLLIElement>();
  const localIndexSig = useSignal<number | null>(null);
  const optionId = `${context.localId}-${_index}`;

  const { toggleIndex$ } = useSelect();

  const isSelectedSig = useComputed$(() => {
    const index = _index ?? null;
    return !disabled && context.selectedIndexesSig.value.includes(index);
  });

  const isHighlightedSig = useComputed$(() => {
    return !disabled && context.highlightedIndexSig.value === _index;
  });

  useTask$(function getIndexTask() {
    if (_index === undefined)
      throw Error('Qwik UI: Select component option cannot find its proper index.');

    localIndexSig.value = _index;
  });

  useTask$(function scrollableTask({ track, cleanup }) {
    track(() => context.highlightedIndexSig.value);

    if (isServer) return;

    let observer: IntersectionObserver;

    const checkVisibility = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      // if the option is not visible, scroll it into view
      if (isHighlightedSig.value && !entry.isIntersecting) {
        optionRef.value?.scrollIntoView(context.scrollOptions);
      }
    };

    cleanup(() => observer?.disconnect());

    if (isBrowser) {
      observer = new IntersectionObserver(checkVisibility, {
        root: context.listboxRef.value,
        threshold: 1.0,
      });

      if (optionRef.value) {
        observer.observe(optionRef.value);
      }
    }
  });

  const handleClick$ = $(() => {
    if (disabled) return;

    if (context.multiple) {
      toggleIndex$(context.selectedIndexesSig, localIndexSig.value, context.optionsSig);

      // keep focus so that when pressing escape, the listbox closes even when clicking.
      context.triggerRef.value?.focus();
    } else {
      context.selectedIndexesSig.value = [localIndexSig.value];
      context.isListboxOpenSig.value = false;
    }
  });

  const handlePointerOver$ = $(() => {
    if (disabled) return;

    if (localIndexSig.value !== null) {
      context.highlightedIndexSig.value = localIndexSig.value;
    }
  });

  const selectContext: SelectOptionContext = {
    isSelectedSig,
  };

  useContextProvider(selectOptionContextId, selectContext);

  return (
    <li
      {...rest}
      id={optionId}
      onClick$={[handleClick$, props.onClick$]}
      onPointerOver$={[handlePointerOver$, props.onPointerOver$]}
      ref={optionRef}
      tabIndex={-1}
      aria-selected={isSelectedSig.value}
      aria-disabled={disabled === true ? 'true' : 'false'}
      data-selected={isSelectedSig.value ? '' : undefined}
      data-highlighted={isHighlightedSig.value ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      data-option
      role="option"
    >
      <Slot />
    </li>
  );
});
