import {
  PropsOf,
  Slot,
  component$,
  useContext,
  useContextProvider,
} from '@builder.io/qwik';

import { comboboxContextId, groupContextId } from './combobox-context';
import { useCombinedRef } from '../../hooks/combined-refs';

type ComboboxGroupProps = PropsOf<'div'>;

export const HComboboxGroup = component$<ComboboxGroupProps>((props) => {
  const context = useContext(comboboxContextId);
  const groupLabelId = `${context.localId}-group-label`;
  const contextRefOpts = { context, givenContextRef: context.groupRef };
  const groupRef = useCombinedRef(props.ref, contextRefOpts);

  const groupContext = {
    groupLabelId,
  };

  useContextProvider(groupContextId, groupContext);

  return (
    <div aria-labelledby={groupLabelId} role="group" {...props} ref={groupRef}>
      <Slot />
    </div>
  );
});
