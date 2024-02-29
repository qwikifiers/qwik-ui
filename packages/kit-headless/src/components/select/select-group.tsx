import {
  PropsOf,
  Slot,
  component$,
  useContext,
  useContextProvider,
  useId,
} from '@builder.io/qwik';

import SelectContextId, { groupContextId } from './select-context';

type SelectGroupProps = PropsOf<'div'>;

export const SelectGroup = component$<SelectGroupProps>((props) => {
  const context = useContext(SelectContextId);
  const labelId = useId();

  const groupContext = {
    labelId,
  };

  useContextProvider(groupContextId, groupContext);

  return (
    <div aria-labelledby={labelId} role="group" {...props} ref={context.groupRef}>
      <Slot />
    </div>
  );
});
