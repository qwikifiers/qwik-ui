import { component$, Slot } from '@builder.io/qwik';

interface ButtonProps {
  class?: string;
  className?: string;
}

export const Button = component$((props: ButtonProps) => {
  return (
    <button {...props}>
      <Slot />
    </button>
  );
});
