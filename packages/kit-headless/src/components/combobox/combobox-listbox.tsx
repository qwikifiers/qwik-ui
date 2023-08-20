import {
  component$,
  Slot,
  type QwikIntrinsicElements,
  useContext
} from '@builder.io/qwik';
import ComboboxContextId from './combobox-context-id';

export type ComboboxListboxProps = QwikIntrinsicElements['ul'];

export const ComboboxListbox = component$((props: ComboboxListboxProps) => {
  // error because we are using context inside of the listbox when it
  const context = useContext(ComboboxContextId);

  return (
    <ul
      ref={context.listboxRef}
      style={{ position: 'absolute' }}
      hidden={!context.isListboxOpenSig.value}
      role="listbox"
      {...props}
    >
      <Slot />
    </ul>
  );
});
