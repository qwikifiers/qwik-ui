import { PropsOf, component$ } from '@builder.io/qwik';

type HComboboxInputProps = PropsOf<'input'>;

export const HComboboxInput = component$((props: HComboboxInputProps) => {
  return <input {...props} />;
});
