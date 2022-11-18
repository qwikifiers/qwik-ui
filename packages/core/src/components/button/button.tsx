import { component$, Slot } from '@builder.io/qwik';
import { WithClassesProp } from '../../types';

interface ButtonProps extends WithClassesProp {}

export const Button = component$((props: ButtonProps) => {
  return (
    <button {...props}>
      <Slot />
    </button>
  );
});
