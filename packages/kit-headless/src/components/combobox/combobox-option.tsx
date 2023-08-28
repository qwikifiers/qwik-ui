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
import { isOptionDisabled, getOptionLabel } from './utils';

import { Option } from './combobox-context.type';

export type ComboboxOptionProps = {
  index: number;
  option: Option;
  disabled?: boolean;
} & QwikIntrinsicElements['li'];

export const ComboboxOption = component$(
  ({ index, option, ...props }: ComboboxOptionProps) => {
    option;

    const context = useContext(ComboboxContextId);

    const isOptionDisabledSig = useComputed$(() => isOptionDisabled(index, context));

    const isHighlightedSig = useComputed$(
      () => !isOptionDisabledSig.value && context.highlightedIndexSig.value === index
    );

    const optionRef = useSignal<HTMLLIElement>();

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

    return (
      <li
        {...props}
        ref={optionRef}
        tabIndex={0}
        aria-selected={isHighlightedSig.value}
        aria-disabled={isOptionDisabledSig.value}
        data-disabled={isOptionDisabledSig.value}
        onClick$={() => {
          if (!context.inputRef.value || isOptionDisabledSig.value) {
            return;
          }

          context.inputRef.value.value = getOptionLabel(
            context.options.value[context.highlightedIndexSig.value],
            context
          );

          context.isListboxOpenSig.value = false;
        }}
        role="option"
        onMouseEnter$={() => (context.highlightedIndexSig.value = index)}
      >
        <Slot />
      </li>
    );
  },
);
