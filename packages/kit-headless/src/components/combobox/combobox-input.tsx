import {
  PropsOf,
  component$,
  useContext,
  $,
  sync$,
  useComputed$,
  useTask$,
  useSignal,
} from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';
import { useCombobox } from './use-combobox';
import { useCombinedRef } from '../../hooks/combined-refs';

type HComboboxInputProps = PropsOf<'input'>;

export const HComboboxInput = component$(
  ({ 'bind:value': givenInputValueSig, ...props }: HComboboxInputProps) => {
    const context = useContext(comboboxContextId);
    const contextRefOpts = { context, givenContextRef: context.inputRef };
    const inputRef = useCombinedRef(props.ref, contextRefOpts);

    const panelId = `${context.localId}-panel`;
    const inputId = `${context.localId}-input`;
    const labelId = `${context.localId}-label`;
    const descriptionId = `${context.localId}-description`;
    const errorMessageId = `${context.localId}-error-message`;
    const initialValueSig = useSignal<string | string[] | undefined>();
    const wasEmptyBeforeBackspaceSig = useSignal(false);
    const isInputResetSig = useSignal(false);

    const {
      selectionManager$,
      getNextEnabledItemIndex$,
      getPrevEnabledItemIndex$,
      getActiveDescendant$,
    } = useCombobox();

    const activeDescendantSig = useComputed$(() => {
      if (context.isListboxOpenSig.value) {
        return getActiveDescendant$(context.highlightedIndexSig.value ?? -1);
      } else {
        return '';
      }
    });

    const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
      const keys = ['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageDown', 'PageUp', 'Enter'];
      if (keys.includes(e.key)) {
        e.preventDefault();
      }
    });

    const handleKeyDown$ = $(async (e: KeyboardEvent) => {
      if (!context.itemsMapSig.value) return;

      context.isKeyboardFocusSig.value = true;

      if (e.key === 'Backspace') {
        // check if input was empty before backspace
        wasEmptyBeforeBackspaceSig.value = context.inputValueSig.value.length === 0;
      }

      switch (e.key) {
        case 'ArrowDown':
          if (
            context.isListboxOpenSig.value &&
            context.highlightedIndexSig.value !== null
          ) {
            context.highlightedIndexSig.value = await getNextEnabledItemIndex$(
              context.highlightedIndexSig.value,
            );
          } else {
            context.isListboxOpenSig.value = true;
          }
          break;

        case 'ArrowUp':
          if (context.isListboxOpenSig.value) {
            context.highlightedIndexSig.value = await getPrevEnabledItemIndex$(
              context.highlightedIndexSig.value!,
            );
          } else {
            context.isListboxOpenSig.value = true;
          }
          break;

        case 'Home':
          if (context.isListboxOpenSig.value) {
            context.highlightedIndexSig.value = await getNextEnabledItemIndex$(-1);
          }
          break;

        case 'End':
          if (context.isListboxOpenSig.value) {
            const lastEnabledOptionIndex = await getPrevEnabledItemIndex$(
              context.itemsMapSig.value.size,
            );
            context.highlightedIndexSig.value = lastEnabledOptionIndex;
          }
          break;

        case 'Tab':
        case 'Escape':
          context.isListboxOpenSig.value = false;
          break;

        case 'Enter':
          if (!context.isListboxOpenSig.value) break;

          await selectionManager$(context.highlightedIndexSig.value, 'toggle');
          if (context.selectedValuesSig.value.length <= 0) break;

          if (!context.multiple) {
            context.isListboxOpenSig.value = false;
            break;
          }

          if (context.inputRef.value) {
            context.inputRef.value.value = '';
            context.inputValueSig.value = '';
            isInputResetSig.value = true;
          }

          break;
      }

      /** When initially opening the listbox, we want to grab the first enabled option index */
      if (context.highlightedIndexSig.value === null) {
        if (e.key === 'ArrowDown') {
          context.highlightedIndexSig.value = await getNextEnabledItemIndex$(-1);
        } else if (e.key === 'ArrowUp') {
          context.highlightedIndexSig.value = await getPrevEnabledItemIndex$(
            context.itemsMapSig.value.size,
          );
        }
        return;
      }
    });

    const handleInput$ = $(async (e: InputEvent, el: HTMLInputElement) => {
      const target = e.target as HTMLInputElement;
      context.inputValueSig.value = target.value;
      context.highlightedIndexSig.value = null;
      isInputResetSig.value = false;

      if (target.value === '' && !context.multiple) {
        context.selectedValuesSig.value = '';
      } else {
        context.isListboxOpenSig.value = true;
      }

      // bind:value on the input
      if (givenInputValueSig) {
        givenInputValueSig.value = el.value;
        context.inputValueSig.value = el.value;
      }
    });

    const handleKeyUp$ = $((e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        // removeOnBackspace
        if (!context.multiple) return;
        if (context.selectedValuesSig.value.length === 0) return;
        if (!context.removeOnBackspace) return;

        if (
          (wasEmptyBeforeBackspaceSig.value || isInputResetSig.value) &&
          context.inputValueSig.value.length === 0
        ) {
          const selectedValuesArray = [...context.selectedValuesSig.value];
          selectedValuesArray.pop();

          context.selectedValuesSig.value = selectedValuesArray;
        }
      }
    });

    /** Users may pass an initial value to bind:value on the input, use the value, or bind:value props on the root. */
    useTask$(function getInitialValues() {
      const { selectedValuesSig, multiple, itemsMapSig, highlightedIndexSig } = context;
      const selectedValues = selectedValuesSig.value;
      const initialValue: string[] = [];

      for (const [index, item] of itemsMapSig.value.entries()) {
        const isSelected = multiple
          ? Array.isArray(selectedValues) && selectedValues.includes(item.value)
          : item.value === selectedValues;

        if (isSelected) {
          initialValue.push(item.displayValue);
          highlightedIndexSig.value = index;
          // end the loop when we've found our selected value in single mode
          if (!multiple) break;
        }
      }

      initialValueSig.value = multiple ? initialValue : initialValue[0] || '';
    });

    const inputValueSig = useComputed$(
      () => givenInputValueSig?.value ?? initialValueSig.value ?? '',
    );

    return (
      <input
        role="combobox"
        value={inputValueSig.value}
        id={inputId}
        onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
        onKeyUp$={[context.removeOnBackspace ? handleKeyUp$ : undefined, props.onKeyUp$]}
        onInput$={[handleInput$, props.onInput$]}
        aria-activedescendant={activeDescendantSig.value}
        aria-expanded={context.isListboxOpenSig.value ? 'true' : 'false'}
        aria-controls={panelId}
        aria-labelledby={labelId}
        aria-describedby={`${descriptionId} 
        ${errorMessageId}`}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        ref={inputRef}
        autocomplete="off"
        placeholder={context.placeholder ?? props.placeholder ?? undefined}
        data-combobox-input
        data-invalid={context.isInvalidSig.value ? '' : undefined}
        {...props}
      />
    );
  },
);
