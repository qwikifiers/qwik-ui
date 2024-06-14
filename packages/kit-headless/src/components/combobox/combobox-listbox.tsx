import { PropsOf, Slot, component$, useContext, useStyles$ } from '@builder.io/qwik';
import styles from './combobox.css?inline';
import { comboboxContextId } from './combobox-context';

type HComboboxListboxProps = PropsOf<'ul'>;

export const HComboboxListbox = component$((props: HComboboxListboxProps) => {
  useStyles$(styles);

  const context = useContext(comboboxContextId);

  return (
    <ul
      ref={context.listboxRef}
      role="listbox"
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
      {...props}
    >
      <Slot />
    </ul>
  );
});
