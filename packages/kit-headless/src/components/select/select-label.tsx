import { component$, PropsOf, Slot } from '@builder.io/qwik';

export type SelectLabelProps = PropsOf<'label'>;

export const SelectLabel = component$((props: SelectLabelProps) => {
  return (
    <label {...props}>
      <Slot />
    </label>
  );
});
