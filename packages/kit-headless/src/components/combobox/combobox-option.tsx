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
import { getOptionLabel } from './utils';

import { Option } from './combobox-context.type';

export type ComboboxOptionProps = {
  index: number;
  option: Option;
} & QwikIntrinsicElements['li'];

export const ComboboxOption = component$(
  ({ index, option, ...props }: ComboboxOptionProps) => {
    // const index = (props as ComboboxOptionProps & { _index: number })._index;
    option;
    const context = useContext(ComboboxContextId);
    const isHighlightedSig = useComputed$(
      () => context.highlightedIndexSig.value === index
    );

    useSignal(false);
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

    //   // NOT a signal. The value property on the options array of objects.
    //   let optionValue, optionLabel, isOptionDisabled;
    //   if (typeof option === 'string') {
    //     optionValue = option;
    //     optionLabel = option;
    //     isOptionDisabled = false;
    //   } else {
    //     const valueKey = context.optionValueKey ?? 'value';
    //     const labelKey = context.optionLabelKey ?? 'label';
    //     const disabledKey = context.optionDisabledKey ?? 'disabled';
    //     if (option[valueKey] === undefined) {
    //       throw new Error(
    //         'Qwik UI: Combobox optionValueKey was not provided, and the option was not a string. Please provide a value for optionValueKey, or ensure that the option is a string.'
    //       );
    //     }

    //     if (option[labelKey] === undefined) {
    //       throw new Error(
    //         'Qwik UI: Combobox optionLabelKey was not provided, and the option was not a string. Please provide a value for optionLabelKey, or ensure that the option is a string.'
    //       );
    //     }

    //     optionValue = option[valueKey];
    //     optionLabel = option[labelKey];
    //     isOptionDisabled = option[disabledKey];
    //   }

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

          context.inputRef.value.value = getOptionLabel(
            context.options.value[context.highlightedIndexSig.value],
            context
          );

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
