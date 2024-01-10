import { component$, PropsOf, Slot } from '@builder.io/qwik';

export type SelectGroupProps = {
  disabled?: boolean;
} & PropsOf<'div'>;

export const SelectGroup = component$(({ disabled, ...props }: SelectGroupProps) => {
  return (
    <div role="group" aria-disabled={disabled} {...props}>
      <Slot />
    </div>
  );
});
