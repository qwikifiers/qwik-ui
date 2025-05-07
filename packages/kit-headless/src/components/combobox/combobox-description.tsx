import { PropsOf, Slot, component$, useContext } from '@qwik.dev/core';
import { comboboxContextId } from './combobox-context';

type HComboboxDescriptionProps = PropsOf<'div'>;

export const HComboboxDescription = component$((props: HComboboxDescriptionProps) => {
  const context = useContext(comboboxContextId);
  const descriptionId = `${context.localId}-description`;

  return (
    <div
      id={descriptionId}
      data-disabled={context.isDisabledSig.value ? '' : undefined}
      {...props}
    >
      <Slot />
    </div>
  );
});
