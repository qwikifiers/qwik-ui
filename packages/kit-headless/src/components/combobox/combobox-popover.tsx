import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

type HComboboxPopoverProps = PropsOf<'div'>;

export const HComboboxPopover = component$((props: HComboboxPopoverProps) => {
  const context = useContext(comboboxContextId);

  return (
    <div ref={context.popoverRef} {...props}>
      <Slot />
    </div>
  );
});
