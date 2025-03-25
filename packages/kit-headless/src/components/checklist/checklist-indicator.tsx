import { component$, type PropsOf, Slot } from '@qwik.dev/core';
import { CheckboxIndicator } from '../checkbox/checkbox-indicator';

type ChecklistItemIndicatorProps = PropsOf<'div'>;

export const ChecklistItemIndicator = component$((props: ChecklistItemIndicatorProps) => {
  return (
    <CheckboxIndicator {...props}>
      <Slot />
    </CheckboxIndicator>
  );
});
