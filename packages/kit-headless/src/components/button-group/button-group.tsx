import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';

export type ButtonGroupProps = HTMLAttributes<HTMLElement>;

export const ButtonGroup = component$((props: ButtonGroupProps) => {
  return (
    <span {...props}>
      <Slot />
    </span>
  );
});
