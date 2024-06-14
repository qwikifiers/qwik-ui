import { PropsOf, Slot, component$, $, useContext } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

type HComboboxItemProps = PropsOf<'li'>;

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
