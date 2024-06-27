import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';
import { useMergedRef } from '../../hooks/merge-refs';

type HComboboxControlProps = PropsOf<'div'>;

/** The Hub is the command center and the anchored element. The listbox is not dismissed unless specified otherwise by the consumer. */
export const HComboboxControl = component$((props: HComboboxControlProps) => {
  const context = useContext(comboboxContextId);
  const controlRef = useMergedRef(props.ref, context, 'controlRef');

  return (
    <div ref={controlRef} data-combobox-control {...props}>
      <Slot />
    </div>
  );
});
