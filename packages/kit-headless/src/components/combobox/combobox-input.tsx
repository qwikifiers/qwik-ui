import {
  PropsOf,
  component$,
  useContext,
  $,
  sync$,
  useComputed$,
} from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';
import { useCombobox } from './use-combobox';
import { useCombinedRef } from '../../hooks/combined-refs';

type HComboboxInputProps = PropsOf<'input'>;

export const HComboboxInput = component$(
  ({ 'bind:value': inputValueSig, ...props }: HComboboxInputProps) => {
    const context = useContext(comboboxContextId);
    const contextRefOpts = { context, givenContextRef: context.inputRef };
    const inputRef = useCombinedRef(props.ref, contextRefOpts);

    const panelId = `${context.localId}-panel`;
    const inputId = `${context.localId}-input`;
    const labelId = `${context.localId}-label`;
    const descriptionId = `${context.localId}-description`;
    const errorMessageId = `${context.localId}-error-message`;

    const {
      selectionManager$,
      getNextEnabledItemIndex$,
      getPrevEnabledItemIndex$,
      getActiveDescendant$,
    } = useCombobox();

    const activeDescendantSig = useComputed$(async () => {
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

      switch (e.key) {
        case 'ArrowDown':
          if (
            context.isListboxOpenSig.value &&
            context.highlightedIndexSig.value !== null
          ) {
            context.highlightedIndexSig.value = await getNextEnabledItemIndex$(
              context.highlightedIndexSig.value,
            );
            console.log('arrow down', context.highlightedIndexSig.value);
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
          if (context.isListboxOpenSig.value) {
            const highlightedIndex = context.highlightedIndexSig.value;
            await selectionManager$(highlightedIndex, 'toggle');

            const isSelected = context.selectedValueSetSig.value.size > 0;
            if (isSelected && !context.multiple) {
              context.isListboxOpenSig.value = false;
            }
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

      // bind:value on the input
      if (inputValueSig) {
        inputValueSig.value = el.value;
      }
    });

    return (
      <input
        role="combobox"
        value={inputValueSig && inputValueSig.value}
        id={inputId}
        onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
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
