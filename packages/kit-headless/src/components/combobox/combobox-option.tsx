import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useComputed$,
  useContext,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import ComboboxContextId from './combobox-context-id';

export type ComboboxOptionProps = {
  index: number;
  option: string | Record<string, any>;
} & QwikIntrinsicElements['li'];

export const ComboboxOption = component$(
  ({ index, option, ...props }: ComboboxOptionProps) => {
    // const index = (props as ComboboxOptionProps & { _index: number })._index;
    const context = useContext(ComboboxContextId);
    const isHighlightedSig = useSignal(false);
    const optionRef = useSignal<HTMLLIElement>();
    // const selectedOptionIndexSig = context.selectedOptionIndexSig;

    // TODO: Get rid of this
    const computedStyle = useComputed$(() => {
      return isHighlightedSig.value
        ? { border: '2px solid maroon' }
        : { border: '2px solid transparent' };
    });

    useVisibleTask$(function preventFocusChangeTask({ cleanup }) {
      if (optionRef.value) {
        const handleMousedown = (e: MouseEvent): void => {
          const isOption = e.target === context.triggerRef.value;
          const isOptionDescendant =
            e.target && optionRef.value?.contains(e.target as Node);

          if (isOption || isOptionDescendant) {
            e.preventDefault();
          }

          if (!context.inputRef.value) {
            return;
          }

          context.inputRef.value.focus();
        };

        optionRef.value.addEventListener('mousedown', handleMousedown);

        cleanup(() => {
          optionRef.value?.removeEventListener('mousedown', handleMousedown);
        });
      }
    });

    useVisibleTask$(function setHighlightedOptionTask({ track }) {
      track(() => context.highlightedIndexSig.value);

      const highlightedOption = context.options.value[context.highlightedIndexSig.value];

      // NOT a signal. The value property on the options array of objects.
      const optionValue = (option as any).value;
      const highlightedOptionValue = highlightedOption
        ? (highlightedOption as any).value
        : undefined;

      if (highlightedOption && highlightedOptionValue === optionValue) {
        isHighlightedSig.value = true;
      } else {
        isHighlightedSig.value = false;
      }
    });

    return (
      <li
        {...props}
        ref={optionRef}
        tabIndex={0}
        style={computedStyle.value}
        aria-selected={isHighlightedSig.value}
        onClick$={() => {
          if (!context.inputRef.value) {
            return;
          }

          context.inputRef.value.value = (
            context.options.value[context.highlightedIndexSig.value] as Record<
              string,
              any
            >
          ).label;

          context.isListboxOpenSig.value = false;
          // context.inputRef.value.focus();
        }}
        role="option"
        onMouseEnter$={() => (context.highlightedIndexSig.value = index)}
      >
        <Slot />
      </li>
    );
  },
);
