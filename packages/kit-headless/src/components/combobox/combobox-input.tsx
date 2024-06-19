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

type HComboboxInputProps = PropsOf<'input'>;

export const HComboboxInput = component$((props: HComboboxInputProps) => {
  const context = useContext(comboboxContextId);
  const listboxId = `${context.localId}-listbox`;
  const inputId = `${context.localId}-input`;
  const labelId = `${context.localId}-label`;

  const initialDisplayValue = !context.multiple
    ? context.itemsMapSig.value.get(
        context.selectedIndexSetSig.value.values().next().value,
      )?.displayValue
    : undefined;

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
        if (context.isListboxOpenSig.value) {
          context.highlightedIndexSig.value = await getNextEnabledItemIndex$(
            context.highlightedIndexSig.value!,
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
        if (context.isListboxOpenSig.value) {
          const action = context.multiple ? 'toggle' : 'add';
          await selectionManager$(context.highlightedIndexSig.value, action);
        }

        if (context.multiple) {
          context.isListboxOpenSig.value = true;
        } else {
          context.isListboxOpenSig.value = false;
        }
        break;

      case 'a':
        if (e.ctrlKey && context.multiple) {
          for (const [index, item] of context.itemsMapSig.value) {
            if (!item.disabled) {
              await selectionManager$(index, 'add');
            }
          }
        }
        break;
    }

    /** When initially opening the listbox, we want to grab the first enabled option index */
    if (context.highlightedIndexSig.value === null) {
      if (e.key === 'ArrowDown') {
        context.highlightedIndexSig.value = await getNextEnabledItemIndex$(-1);
      } else {
        context.highlightedIndexSig.value = await getPrevEnabledItemIndex$(
          context.itemsMapSig.value.size,
        );
      }
      return;
    }
  });

  return (
    <input
      role="combobox"
      value={initialDisplayValue || undefined}
      id={inputId}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      aria-activedescendant={activeDescendantSig.value}
      aria-expanded={context.isListboxOpenSig.value ? 'true' : 'false'}
      aria-controls={listboxId}
      aria-labelledby={labelId}
      aria-autocomplete="list"
      aria-haspopup="listbox"
      ref={context.inputRef}
      data-combobox-input
      {...props}
    />
  );
});
