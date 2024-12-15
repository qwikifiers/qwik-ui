import { component$, Slot, useContext } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

export const ComboboxInline = component$(() => {
  const context = useContext(comboboxContextId);
  const inlineId = `${context.localId}-inline`;

  return (
    <div id={inlineId} role="listbox">
      <Slot />
    </div>
  );
});
