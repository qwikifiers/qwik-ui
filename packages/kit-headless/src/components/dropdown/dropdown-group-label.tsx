import { PropsOf, Slot, component$, useContext } from '@qwik.dev/core';

import { dropdownGroupContextId } from './dropdown-context';

type DropdownLabelProps = PropsOf<'span'>;

export const HDropdownGroupLabel = component$<DropdownLabelProps>((props) => {
  const groupContext = useContext(dropdownGroupContextId);

  return (
    <span id={groupContext.groupLabelId} {...props}>
      <Slot />
    </span>
  );
});
