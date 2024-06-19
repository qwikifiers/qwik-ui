import {
  PropsOf,
  Slot,
  component$,
  useContext,
  useContextProvider,
} from '@builder.io/qwik';

import { comboboxContextId, groupContextId } from './combobox-context';

type ComboboxGroupProps = PropsOf<'div'>;

export const HComboboxGroup = component$<ComboboxGroupProps>((props) => {
  const context = useContext(comboboxContextId);
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
