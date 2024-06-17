import {
  PropsOf,
  Slot,
  component$,
  $,
  useContext,
  useSignal,
  useTask$,
  useComputed$,
  useContextProvider,
} from '@builder.io/qwik';
import {
  ComboboxItemContext,
  comboboxContextId,
  comboboxItemContextId,
} from './combobox-context';
import { useCombobox } from './use-combobox';

export type HComboboxItemProps = PropsOf<'li'> & {
  /** Internal index we get from the inline component. Please see combobox-inline.tsx */
  _index?: number;

  /** If true, item is not selectable or focusable. */
  disabled?: boolean;

  /** Selected value associated with the item. */
  value?: string;
};

export const HComboboxItem = component$(
  ({ disabled, _index, ...rest }: HComboboxItemProps) => {
    const context = useContext(comboboxContextId);

    const { selectionManager$ } = useCombobox();
    const localIndexSig = useSignal<number | null>(null);
    const isSelectedSig = useComputed$(() => {
      const index = _index ?? null;
      return !disabled && context.selectedIndexSetSig.value.has(index!);
    });
    const isHighlightedSig = useComputed$(() => {
      if (disabled) return;

      if (context.highlightedIndexSig.value === _index) {
        return true;
      } else {
        return false;
      }
    });

    useTask$(async function getIndexTask() {
      if (_index === undefined)
        throw Error('Qwik UI: Select component item cannot find its proper index.');

      localIndexSig.value = _index;
    });

    const handleClick$ = $(async () => {
      if (disabled || localIndexSig.value === null) return;

      if (context.multiple) {
        await selectionManager$(localIndexSig.value, 'toggle');

        // keep focus so that when pressing escape, the listbox closes even when clicking.
        context.triggerRef.value?.focus();
      } else {
        await selectionManager$(localIndexSig.value, 'add');
        context.isListboxOpenSig.value = false;
      }
    });

    const handlePointerOver$ = $(() => {
      if (disabled) return;

      if (localIndexSig.value !== null) {
        context.highlightedIndexSig.value = localIndexSig.value;
      }
    });

    const itemContext: ComboboxItemContext = {
      isSelectedSig,
    };

    useContextProvider(comboboxItemContextId, itemContext);

    return (
      <li
        role="option"
        id={`${context.localId}-${_index}`}
        aria-selected={isSelectedSig.value}
        aria-disabled={disabled === true ? 'true' : 'false'}
        data-selected={isSelectedSig.value ? '' : undefined}
        data-highlighted={isHighlightedSig.value ? '' : undefined}
        onPointerOver$={[handlePointerOver$, rest.onPointerOver$]}
        data-item
        onClick$={handleClick$}
        {...rest}
      >
        <Slot />
      </li>
    );
  },
);
