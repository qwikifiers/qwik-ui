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
import {
  isOptionDisabled,
  getOptionLabel,
  getNextEnabledOptionIndex,
  getPrevEnabledOptionIndex
} from './utils';

const preventedKeys = [KeyCode.Home, KeyCode.End, KeyCode.PageDown, KeyCode.ArrowUp];

export type ComboboxInputProps = QwikIntrinsicElements['input'];

export const ComboboxInput = component$((props: ComboboxInputProps) => {
  const context = useContext(ComboboxContextId);

  const onKeydownBehavior$ = $((e: QwikKeyboardEvent) => {
    const highlightedOptionLabel = getOptionLabel(
      context.options.value[context.highlightedIndexSig.value],
      context
    );

    if (e.key === 'ArrowDown') {
      const nextEnabledOptionIndex = getNextEnabledOptionIndex(
        context.highlightedIndexSig.value,
        context
      );
      context.highlightedIndexSig.value = nextEnabledOptionIndex;

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
      onBlur$={() => (context.isListboxOpenSig.value = false)}
      onKeyDown$={[onKeydownBehavior$, props.onKeyDown$]}
      {...props}
    />
  );
});
