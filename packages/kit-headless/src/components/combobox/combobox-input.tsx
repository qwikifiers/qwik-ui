import {
  $,
  component$,
  useContext,
  useSignal,
  useTask$,
  type QwikKeyboardEvent,
  type ContextId,
  PropsOf,
} from '@builder.io/qwik';
import ComboboxContextId from './combobox-context-id';
import type { ComboboxContext, Option } from './combobox-context.type';
import {
  getActiveDescendant,
  getNextEnabledOptionIndex,
  getPrevEnabledOptionIndex,
} from './utils';

export type ComboboxInputProps = {
  disableOnBlur?: boolean;
} & PropsOf<'input'>;

export const ComboboxInput = component$(
  <O extends Option = Option>({
    disableOnBlur = false,
    ...props
  }: ComboboxInputProps) => {
    const context = useContext(ComboboxContextId as ContextId<ComboboxContext<O>>);

    const inputId = props.id || `${context.localId}-input`;
    const listboxId = `${context.localId}-listbox`;

    const isDefaultLabelNeededSig = useSignal<boolean>(true);

    const onInputBehavior$ = $((e: InputEvent) => {
      context.isListboxOpenSig.value = true;

      // Deselect the currently selected option
      context.highlightedIndexSig.value = -1;

      const inputElement = e.target as HTMLInputElement;

      context.inputValueSig.value = inputElement.value;
    });

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

    return (
      <input
        type="text"
        {...props}
        id={inputId || props.id}
        ref={context.inputRef}
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
        onInput$={[onInputBehavior$, props.onInput$]}
        onBlur$={[
          $(() => {
            disableOnBlur ? null : (context.isListboxOpenSig.value = false);
          }),
          props.onBlur$,
        ]}
        onKeyDown$={[onKeydownBehavior$, props.onKeyDown$]}
      />
    );
  },
);
