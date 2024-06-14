import { PropsOf, Slot, component$, $, useContext } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

export type HComboboxItemProps = PropsOf<'li'> & {
  /** Internal index we get from the inline component. Please see combobox-inline.tsx */
  _index?: number;

  /** If true, item is not selectable or focusable. */
  disabled?: boolean;

  /** Selected value associated with the item. */
  value?: string;
};

export const HComboboxItem = component$((props: HComboboxItemProps) => {
  const context = useContext(comboboxContextId);

  const handleClick$ = $(async () => {
    context.isListboxOpenSig.value = false;
  });

  return (
    <li data-item onClick$={handleClick$} {...props}>
      <Slot />
    </li>
  );
});
