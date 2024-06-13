import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type HComboboxLabelProps = PropsOf<'label'>;

export const HComboboxLabel = component$((props: HComboboxLabelProps) => {
  return (
    <label {...props}>
      <Slot />
    </label>
  );
});
