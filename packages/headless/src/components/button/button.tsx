import { component$, Slot, useSignal } from '@builder.io/qwik';

export interface ButtonProps {
  class?: string;
  disabled?: boolean;
}


export const Button = component$((props: ButtonProps) => {
  return (
      <button
        {...props}
      ><Slot /></button>
  );
});

