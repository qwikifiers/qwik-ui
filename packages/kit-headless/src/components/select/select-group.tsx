import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';

export type SelectGroupProps = {
  disabled?: boolean;
} & QwikIntrinsicElements['div'];

export const SelectGroup = component$(({ disabled, ...props }: SelectGroupProps) => {
  return (
    <div role="group" aria-disabled={disabled} {...props}>
      <Slot />
    </div>
  );
});
