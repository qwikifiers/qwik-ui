import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { groupContextId } from './select-context';

type SelectLabelProps = PropsOf<'li'>;

export const HSelectGroupLabel = component$<SelectLabelProps>((props) => {
  const groupContext = useContext(groupContextId);

  return (
    <li id={groupContext.groupLabelId} {...props}>
      <Slot />
    </li>
  );
});
