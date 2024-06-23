import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

type HComboboxControlProps = PropsOf<'div'>;

/** The Hub is the command center and the anchored element. The listbox is not dismissed unless specified otherwise by the consumer. */
export const HComboboxControl = component$((props: HComboboxControlProps) => {
  const context = useContext(comboboxContextId);

  return (
    <div ref={context.controlRef} data-combobox-control {...props}>
      <Slot />
    </div>
  );
});
