import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';
import { useCombinedRef } from '../../hooks/combined-refs';

type HComboboxControlProps = PropsOf<'div'>;

/** The Hub is the command center and the anchored element. The listbox is not dismissed unless specified otherwise by the consumer. */
export const HComboboxControl = component$((props: HComboboxControlProps) => {
  const context = useContext(comboboxContextId);
  const contextRefOpts = { context, givenContextRef: context.controlRef };
  const controlRef = useCombinedRef(props.ref, contextRefOpts);

  return (
    <div
      ref={controlRef}
      data-combobox-control
      data-invalid={context.isInvalidSig?.value ? '' : undefined}
      {...props}
    >
      <Slot />
    </div>
  );
});
