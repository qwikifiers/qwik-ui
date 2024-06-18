import { $, Slot, component$, useContext } from '@builder.io/qwik';
import { DropdownItemProps, HDropdownItem } from './dropdown-item';

import { dropdownRadioGroupContextId } from './dropdown-context';

type DropdownRadioItemProps = {
  /** Value of the item. */
  value: string;
} & DropdownItemProps;

export const HDropdownRadioItem = component$((props: DropdownRadioItemProps) => {
  const { disabled = false, value, closeOnSelect = false, ...rest } = props;

  const groupContext = useContext(dropdownRadioGroupContextId);

  const onSelect = $(() => {
    groupContext.valueSig.value = value;
    props.onSelect$?.();
  });

  return (
    <HDropdownItem
      {...rest}
      onSelect$={onSelect}
      role="menuitemradio"
      closeOnSelect={closeOnSelect}
      disabled={disabled || groupContext.disabled}
      aria-checked={value === groupContext.valueSig.value ? 'true' : 'false'}
      aria-disabled={disabled || groupContext.disabled}
      style={{ display: 'flex', alignItems: 'center' }}
      data-disabled={disabled || groupContext.disabled}
      data-checked={value === groupContext.valueSig.value}
    >
      <Slot name="dropdown-item-indicator" />
      <Slot />
    </HDropdownItem>
  );
});
