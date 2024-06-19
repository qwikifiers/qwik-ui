import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { groupContextId } from './combobox-context';

type HComboboxGroupLabelProps = PropsOf<'li'>;

export const HComboboxGroupLabel = component$((props: HComboboxGroupLabelProps) => {
  const groupContext = useContext(groupContextId);

  return (
    <li id={groupContext.groupLabelId} {...props}>
      <Slot />
    </li>
  );
});
