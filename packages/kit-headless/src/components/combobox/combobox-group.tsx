import { PropsOf, Slot, component$ } from '@builder.io/qwik';

export type ComboboxGroupProps = PropsOf<'div'>;

export const ComboboxGroup = component$((props: ComboboxGroupProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
