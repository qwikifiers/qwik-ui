import { PropsOf, Slot, component$, useContext } from '@qwik.dev/core';
import { groupContextId } from './combobox-context';

type HComboboxGroupLabelProps = PropsOf<'div'>;

export const HComboboxGroupLabel = component$((props: HComboboxGroupLabelProps) => {
  const groupContext = useContext(groupContextId);

  return (
    <div data-group-label id={groupContext.groupLabelId} {...props}>
      <Slot />
    </div>
  );
});
