import { PropsOf, component$ } from '@builder.io/qwik';

export type ComboboxInputProps = PropsOf<'input'>;

export const ComboboxInput = component$((props: ComboboxInputProps) => {
  return <input {...props} />;
});
