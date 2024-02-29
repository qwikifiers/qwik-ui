import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { groupContextId } from './select-context';

type SelectLabelProps = PropsOf<'li'>;

export const SelectLabel = component$<SelectLabelProps>((props) => {
  const groupContext = useContext(groupContextId);

  return (
    <li id={groupContext.labelId} {...props}>
      <Slot />
    </li>
  );
});
