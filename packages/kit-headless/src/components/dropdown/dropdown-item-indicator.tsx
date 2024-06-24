import {
  CheckboxIndicator,
  CheckboxIndicatorProps,
} from '../checkbox/checkbox-indicator';
import { Slot, component$ } from '@builder.io/qwik';

type DropdownItemIndicatorProps = CheckboxIndicatorProps;

export const HDropdownItemIndicator = component$((props: DropdownItemIndicatorProps) => {
  return (
    <CheckboxIndicator data-indicator {...props}>
      <Slot />
    </CheckboxIndicator>
  );
});
