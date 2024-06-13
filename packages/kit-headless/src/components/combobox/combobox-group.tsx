import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type HComboboxGroupProps = PropsOf<'div'>;

export const HComboboxGroup = component$((props: HComboboxGroupProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
