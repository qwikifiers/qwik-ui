import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type HComboboxGroupLabelProps = PropsOf<'div'>;

export const HComboboxGroupLabel = component$((props: HComboboxGroupLabelProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
