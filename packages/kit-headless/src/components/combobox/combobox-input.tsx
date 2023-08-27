import {
  $,
  QwikKeyboardEvent,
  component$,
  useContext,
  useVisibleTask$,
  type QwikIntrinsicElements
} from '@builder.io/qwik';
import { KeyCode } from '../../utils';
import ComboboxContextId from './combobox-context-id';
import { getOptionLabel } from './utils';

const preventedKeys = [KeyCode.Home, KeyCode.End, KeyCode.PageDown, KeyCode.ArrowUp];

export type ComboboxInputProps = QwikIntrinsicElements['input'];

// Add required context here
export const ComboboxInput = component$((props: ComboboxInputProps) => {
  const context = useContext(ComboboxContextId);

  const onKeydownBehavior$ = $((e: QwikKeyboardEvent) => {
    const highlightedOptionLabel = getOptionLabel(
      context.options.value[context.highlightedIndexSig.value],
      context
    );

    if (e.key === 'ArrowDown') {
      if (!context.isListboxOpenSig.value && context.highlightedIndexSig.value === -1) {
        context.highlightedIndexSig.value = 0;
      }

      // If the listbox is already open, move down
      if (context.isListboxOpenSig.value) {
        context.highlightedIndexSig.value === context.options.value.length - 1
          ? (context.highlightedIndexSig.value = 0)
          : context.highlightedIndexSig.value++;
      }

      context.isListboxOpenSig.value = true;
    }

    if (e.key === 'ArrowUp') {
      context.highlightedIndexSig.value === 0
        ? (context.highlightedIndexSig.value = context.options.value.length - 1)
        : context.highlightedIndexSig.value--;
    }

    if (e.key === 'Enter') {
      const inputElement = e.target as HTMLInputElement;
      inputElement.value = highlightedOptionLabel;
      context.isListboxOpenSig.value = false;
    }

    if (e.key === 'Home') {
      context.highlightedIndexSig.value = 0;
    }

    if (e.key === 'End') {
      context.highlightedIndexSig.value = context.options.value.length - 1;
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
      ref={context.inputRef}
      type="text"
      onInput$={(e: InputEvent) => {
        context.isListboxOpenSig.value = true;

        // Deselect the currently selected option
        context.highlightedIndexSig.value = -1;

        const inputElement = e.target as HTMLInputElement;

        if (context.onInputChange$) {
          context.onInputChange$(inputElement.value);
        }
      }}
      onKeyDown$={[onKeydownBehavior$, props.onKeyDown$]}
      {...props}
    />
  );
});
