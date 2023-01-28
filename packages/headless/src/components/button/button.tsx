import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';

type ButtonProps = {
  disabled?: boolean;
};

export const Button = component$(
  (props: ButtonProps & HTMLAttributes<HTMLButtonElement>) => {
    return (
      <button {...props}>
        <Slot />
      </button>
    );
  }
);
