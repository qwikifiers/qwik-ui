import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
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
