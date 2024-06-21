import { Slot, component$, useContext, useSignal, useTask$ } from '@builder.io/qwik';

import { DropdownCheckboxItemProps } from './dropdown-checkbox-item';
import { HDropdownCheckboxItem } from './dropdown-checkbox-item';
import { dropdownRadioGroupContextId } from './dropdown-context';

type DropdownRadioItemProps = {
  /** Value of the item. */
  value: string;
} & DropdownCheckboxItemProps;

export const HDropdownRadioItem = component$((props: DropdownRadioItemProps) => {
  const { disabled = false, value, closeOnSelect = false, ...rest } = props;

  const groupContext = useContext(dropdownRadioGroupContextId);

  const checkedSig = useSignal<boolean>(value === groupContext.valueSig.value);

  useTask$(function trackGroupValue({ track }) {
    track(() => groupContext.valueSig.value);

    checkedSig.value = value === groupContext.valueSig.value;
  });

  return (
    <HDropdownCheckboxItem
      bind:checked={checkedSig}
      onChange$={(checked) => {
        if (checked) {
          groupContext.valueSig.value = value;
        }
      }}
      {...rest}
      role="menuitemradio"
      closeOnSelect={closeOnSelect}
      disabled={disabled || groupContext.disabled}
      aria-checked={checkedSig.value ? 'true' : 'false'}
      aria-disabled={disabled || groupContext.disabled}
      data-disabled={disabled || groupContext.disabled}
      data-checked={checkedSig.value}
    >
      <Slot />
    </HDropdownCheckboxItem>
  );
});
