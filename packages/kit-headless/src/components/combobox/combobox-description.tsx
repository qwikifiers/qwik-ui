import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type HComboboxDescriptionProps = PropsOf<'div'>;

export const HComboboxDescription = component$((props: HComboboxDescriptionProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
