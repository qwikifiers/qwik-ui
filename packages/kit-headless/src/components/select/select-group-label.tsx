import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { groupContextId } from './select-context';

type SelectLabelProps = PropsOf<'div'>;

export const HSelectGroupLabel = component$<SelectLabelProps>((props) => {
  const groupContext = useContext(groupContextId);

  return (
    <div id={groupContext.groupLabelId} data-group-label {...props}>
      <Slot />
    </div>
  );
});
