import { Slot, component$, type PropsOf } from '@builder.io/qwik';
import { Label } from '../label';

export type ComboboxLabelProps = PropsOf<'label'>;

export const ComboboxLabel = component$((props: ComboboxLabelProps) => {
  return (
    <Label {...props}>
      <Slot />
    </Label>
  );
});
