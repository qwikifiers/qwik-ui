import {
  QwikIntrinsicElements,
  Signal,
  Slot,
  component$,
  useComputed$,
  useContext,
  useId,
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
  // remove non-li props from props
  ({ index, option: _0, disabled: _1, ...liProps }: ComboboxOptionProps) => {
    const context = useContext(ComboboxContextId);
    const optionId = useId();
    context.optionIds.value[index] = optionId;

    const isOptionDisabledSig = useComputed$(() => isOptionDisabled(index, context));

    const isHighlightedSig = useComputed$(
      () =>
        !(isOptionDisabledSig as Signal<boolean>).value &&
        context.highlightedIndexSig.value === index,
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
        {...liProps}
        id={optionId}
        ref={optionRef}
        tabIndex={0}
        role="option"
        aria-selected={isHighlightedSig.value}
        aria-disabled={isOptionDisabledSig.value}
        data-disabled={isOptionDisabledSig.value}
        onClick$={() => {
          if (!context.inputRef.value || isOptionDisabledSig.value) {
            return;
          }

          context.inputRef.value.value = getOptionLabel(
            context.optionsSig.value[context.highlightedIndexSig.value]?.option,
            context.optionLabelKey,
          );

          context.isListboxOpenSig.value = false;
        }}
        onMouseEnter$={() => (context.highlightedIndexSig.value = index)}
      >
        <Slot />
      </li>
    );
  },
);
