import { component$, PropsOf, Slot, useContext } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

export const ComboboxInline = component$((props: PropsOf<'div'>) => {
  const context = useContext(comboboxContextId);
  const inlineId = `${context.localId}-inline`;

  return (
    <div id={inlineId} role="listbox" {...props}>
      <Slot />
    </div>
  );
});
