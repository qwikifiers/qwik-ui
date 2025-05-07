import {
  DropdownGroupContext,
  dropdownContextId,
  dropdownGroupContextId,
} from './dropdown-context';
import {
  PropsOf,
  Slot,
  component$,
  useContext,
  useContextProvider,
} from '@qwik.dev/core';

type DropdownGroupProps = PropsOf<'div'>;

export const HDropdownGroup = component$((props: DropdownGroupProps) => {
  const context = useContext(dropdownContextId);
  const groupLabelId = `${context.localId}-group-label`;

  const dropdownGroupContext: DropdownGroupContext = {
    groupLabelId,
  };

  useContextProvider(dropdownGroupContextId, dropdownGroupContext);

  return (
    <div aria-labelledby={groupLabelId} role="group" {...props}>
      <Slot />
    </div>
  );
});
