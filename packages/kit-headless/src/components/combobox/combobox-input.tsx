import {
  $,
  QwikKeyboardEvent,
  component$,
  useContext,
  useVisibleTask$,
  type QwikIntrinsicElements,
  useTask$,
  useSignal
} from '@builder.io/qwik';
import { KeyCode } from '../../utils';
import ComboboxContextId from './combobox-context-id';
import { Option } from './combobox-context.type';
import {
  isOptionDisabled,
  getOptionLabel,
  getNextEnabledOptionIndex,
  getPrevEnabledOptionIndex
} from './utils';

const preventedKeys = [KeyCode.Home, KeyCode.End, KeyCode.PageDown, KeyCode.ArrowUp];

export type ComboboxInputProps = QwikIntrinsicElements['input'];

export const ComboboxInput = component$(({ ...props }: ComboboxInputProps) => {
  const context = useContext(ComboboxContextId);

  const inputId = `${context.localId}-input`;
  const listboxId = `${context.localId}-listbox`;

  const isDefaultLabelNeededSig = useSignal<boolean>(true);

  const onKeydownBehavior$ = $((e: QwikKeyboardEvent) => {
    const highlightedOptionLabel = getOptionLabel(
      context.options.value[context.highlightedIndexSig.value],
      context
    );

    if (e.key === 'ArrowDown') {
      if (context.isListboxOpenSig.value) {
        const nextEnabledOptionIndex = getNextEnabledOptionIndex(
          context.highlightedIndexSig.value,
          context
        );

        context.highlightedIndexSig.value = nextEnabledOptionIndex;
      } else if (context.highlightedIndexSig.value === -1) {
        // get the first enabled option when there is no highlighted index
        const firstEnabledOptionIndex = getNextEnabledOptionIndex(-1, context);
        context.highlightedIndexSig.value = firstEnabledOptionIndex;
      }

      context.isListboxOpenSig.value = true;
    }

    if (e.key === 'ArrowUp') {
      const prevEnabledOptionIndex = getPrevEnabledOptionIndex(
        context.highlightedIndexSig.value,
        context
      );
      context.highlightedIndexSig.value = prevEnabledOptionIndex;
    }

    if (e.key === 'Enter') {
      // if they somehow manage to highlight a disabled option (bug)
      if (isOptionDisabled(context.highlightedIndexSig.value, context)) {
        return;
      }

      const inputElement = e.target as HTMLInputElement;
      inputElement.value = highlightedOptionLabel;
      context.isListboxOpenSig.value = false;
    }

    if (e.key === 'Home') {
      const firstEnabledOptionIndex = getNextEnabledOptionIndex(-1, context);
      context.highlightedIndexSig.value = firstEnabledOptionIndex;
    }

    if (e.key === 'End') {
      const lastEnabledOptionIndex = getPrevEnabledOptionIndex(
        context.options.value.length,
        context
      );
      context.highlightedIndexSig.value = lastEnabledOptionIndex;
    }

    if (e.key === 'Escape') {
      context.isListboxOpenSig.value = false;
    }
  });

  // checks if a defaultLabel has been set on the input
  useTask$(function isLabelNeededTask() {
    if (!context.inputRef.value || !context.defaultLabel) {
      return;
    }

    if (context.inputRef.value.value === context.defaultLabel) {
      isDefaultLabelNeededSig.value = false;
    }
  });

  useTask$(function highlightDefaultLabelTask() {
    const defaultIndex = context.options.value.findIndex((option: Option) => {
      if (typeof option === 'string') {
        return option === context.defaultLabel;
      } else if (context.optionLabelKey && option[context.optionLabelKey]) {
        return option[context.optionLabelKey] === context.defaultLabel;
      }
      return false;
    });

    if (defaultIndex !== -1) {
      context.highlightedIndexSig.value = defaultIndex;
    }
  });

  useVisibleTask$(function preventDefaultTask({ cleanup }) {
    function keyHandler(e: KeyboardEvent) {
      if (preventedKeys.includes(e.key as KeyCode)) {
        e.preventDefault();
      }
    }

    context.inputRef?.value?.addEventListener('keydown', keyHandler);
    cleanup(() => {
      context.inputRef?.value?.removeEventListener('keydown', keyHandler);
    });
  });

  return (
    <input
      id={inputId}
      ref={context.inputRef}
      type="text"
      role="combobox"
      aria-expanded={context.isListboxOpenSig.value}
      aria-haspopup="listbox"
      aria-autocomplete="list"
      aria-activedescendant={context.optionIds.value[context.highlightedIndexSig.value]}
      aria-controls={listboxId}
      onInput$={(e: InputEvent) => {
        context.isListboxOpenSig.value = true;

        // Deselect the currently selected option
        context.highlightedIndexSig.value = -1;

        const inputElement = e.target as HTMLInputElement;

        if (context.onInputChange$) {
          context.onInputChange$(inputElement.value);
        }
      }}
      value={isDefaultLabelNeededSig && context.defaultLabel}
      onBlur$={() => (context.isListboxOpenSig.value = false)}
      onKeyDown$={[onKeydownBehavior$, props.onKeyDown$]}
      {...props}
    />
  );
});
