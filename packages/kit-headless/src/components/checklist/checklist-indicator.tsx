import { component$, type PropsOf, Slot } from '@builder.io/qwik';
import { CheckboxIndicator } from '../checkbox/checkbox-indicator';

type ChecklistItemIndicatorProps = PropsOf<'div'>;

export const ChecklistItemIndicator = component$((props: ChecklistItemIndicatorProps) => {
  return (
    <CheckboxIndicator {...props}>
      <Slot />
    </CheckboxIndicator>
  );
});
