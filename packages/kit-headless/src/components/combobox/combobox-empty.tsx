import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

export const HComboboxEmpty = component$((props: PropsOf<'div'>) => {
  const context = useContext(comboboxContextId);

  return (
    <div
      data-qui-combobox-empty
      data-empty={context.hasVisibleItemsSig.value ? undefined : ''}
      {...props}
    >
      <Slot />
    </div>
  );
});
