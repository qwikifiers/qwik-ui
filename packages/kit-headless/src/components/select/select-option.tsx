import {
  component$,
  Slot,
  type PropsOf,
  useContext,
  useTask$,
  useSignal,
  $,
  useComputed$,
} from '@builder.io/qwik';
import SelectContextId from './select-context';
import { isServer } from '@builder.io/qwik/build';

export type SelectOptionProps = PropsOf<'li'> & {
  index?: number;
  disabled?: boolean;
};

export const SelectOption = component$<SelectOptionProps>((props) => {
  /* look at select-inline on how we get the index. */
  const { index, disabled, ...rest } = props;
  const context = useContext(SelectContextId);
  const optionRef = useSignal<HTMLLIElement>();
  const localIndexSig = useSignal<number | null>(null);

  const isSelectedSig = useComputed$(() => {
    return !disabled && context.selectedIndexSig.value === index;
  });

  const isHighlightedSig = useComputed$(() => {
    return !disabled && context.highlightedIndexSig.value === index;
  });

  useTask$(function getIndexTask() {
    if (index === undefined)
      throw Error('Qwik UI: Select component option cannot find its proper index.');

    localIndexSig.value = index;
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

    if (typeof window !== 'undefined') {
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

    context.selectedIndexSig.value = localIndexSig.value;
    context.isListboxOpenSig.value = false;
  });

  const handlePointerOver$ = $(() => {
    if (disabled) return;

    if (localIndexSig.value !== null) {
      context.highlightedIndexSig.value = localIndexSig.value;
    }
  });

  return (
    <li
      {...rest}
      onClick$={[handleClick$, props.onClick$]}
      onPointerOver$={[handlePointerOver$, props.onPointerOver$]}
      ref={optionRef}
      tabIndex={-1}
      aria-selected={isSelectedSig.value}
      aria-disabled={disabled === true ? 'true' : 'false'}
      data-selected={isSelectedSig.value ? '' : undefined}
      data-highlighted={isHighlightedSig.value ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      role="option"
    >
      <Slot />
    </li>
  );
});
