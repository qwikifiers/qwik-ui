import {
  $,
  component$,
  useContext,
  useSignal,
  useTask$,
  useVisibleTask$,
  type QwikKeyboardEvent,
  type QwikIntrinsicElements,
  type ContextId,
} from '@builder.io/qwik';
import { KeyCode } from '../../utils';
import ComboboxContextId from './combobox-context-id';
import type { ComboboxContext, Option } from './combobox-context.type';
import {
  getActiveDescendant,
  getNextEnabledOptionIndex,
  getPrevEnabledOptionIndex,
} from './utils';

const preventedKeys = [KeyCode.Home, KeyCode.End, KeyCode.PageDown, KeyCode.ArrowUp];

export type ComboboxInputProps = {
  disableOnBlur?: boolean;
} & QwikIntrinsicElements['input'];

export const ComboboxInput = component$(
  <O extends Option = Option>({
    disableOnBlur = false,
    ...props
  }: ComboboxInputProps) => {
    const context = useContext(ComboboxContextId as ContextId<ComboboxContext<O>>);

    const inputId = props.id || `${context.localId}-input`;
    const listboxId = `${context.localId}-listbox`;

    const isDefaultLabelNeededSig = useSignal<boolean>(true);

    const onKeydownBehavior$ = $((e: QwikKeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        if (context.isListboxOpenSig.value) {
          const nextEnabledOptionIndex = getNextEnabledOptionIndex(
            context.highlightedIndexSig.value,
            context.filteredOptionsSig,
          );

          context.highlightedIndexSig.value = nextEnabledOptionIndex;
        } else if (context.highlightedIndexSig.value === -1) {
          // get the first enabled option when there is no highlighted index
          const firstEnabledOptionIndex = getNextEnabledOptionIndex(
            -1,
            context.filteredOptionsSig,
          );
          context.highlightedIndexSig.value = firstEnabledOptionIndex;
        }
        context.isListboxOpenSig.value = true;
      }

      if (e.key === 'ArrowUp') {
        const prevEnabledOptionIndex = getPrevEnabledOptionIndex(
          context.highlightedIndexSig.value,
          context.filteredOptionsSig,
        );
        context.highlightedIndexSig.value = prevEnabledOptionIndex;
      }

      if (e.key === 'Enter') {
        context.isListboxOpenSig.value = false;

        // if they somehow manage to highlight a disabled option (bug)
        if (
          context.filteredOptionsSig.value[context.highlightedIndexSig.value].disabled
        ) {
          return;
        }

        const inputElement = e.target as HTMLInputElement;
        inputElement.value =
          context.filteredOptionsSig.value[context.highlightedIndexSig.value].label;
      }

      if (e.key === 'Home') {
        const firstEnabledOptionIndex = getNextEnabledOptionIndex(
          -1,
          context.filteredOptionsSig,
        );
        context.highlightedIndexSig.value = firstEnabledOptionIndex;
      }

      if (e.key === 'End') {
        const lastEnabledOptionIndex = getPrevEnabledOptionIndex(
          context.filteredOptionsSig.value.length,
          context.filteredOptionsSig,
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
      const defaultIndex = context.filteredOptionsSig.value.findIndex(
        ({ label }) => label === context.defaultLabel,
      );

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
        {...props}
        id={inputId || props.id}
        ref={context.inputRef}
        type="text"
        role="combobox"
        aria-expanded={context.isListboxOpenSig.value}
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-activedescendant={
          context.isListboxOpenSig.value
            ? getActiveDescendant(
                context.highlightedIndexSig,
                context.filteredOptionsSig,
                context.localId,
              )
            : ''
        }
        aria-controls={listboxId}
        value={context.inputValueSig.value}
        onInput$={(e: InputEvent) => {
          context.isListboxOpenSig.value = true;

          // Deselect the currently selected option
          context.highlightedIndexSig.value = -1;

          const inputElement = e.target as HTMLInputElement;

          context.inputValueSig.value = inputElement.value;
        }}
        onBlur$={() => {
          disableOnBlur ? null : (context.isListboxOpenSig.value = false);
        }}
        onKeyDown$={[onKeydownBehavior$, props.onKeyDown$]}
      />
    );
  },
);
