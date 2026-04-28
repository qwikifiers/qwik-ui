import { PropsOf, Slot, component$, useContext } from '@qwik.dev/core';
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
