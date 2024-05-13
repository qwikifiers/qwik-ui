import {
  PropsOf,
  Slot,
  component$,
  useContext,
  useContextProvider,
} from '@builder.io/qwik';

import SelectContextId, { groupContextId } from './select-context';

type SelectGroupProps = PropsOf<'div'>;

export const HSelectGroup = component$<SelectGroupProps>((props) => {
  const context = useContext(SelectContextId);
  const groupLabelId = `${context.localId}-group-label`;

  const groupContext = {
    groupLabelId,
  };

  useContextProvider(groupContextId, groupContext);

  return (
    <div aria-labelledby={groupLabelId} role="group" {...props} ref={context.groupRef}>
      <Slot />
    </div>
  );
});
