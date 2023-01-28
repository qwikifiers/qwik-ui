import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
import { Button as HeadlessButton } from '@qwik-ui/headless';

type ButtonProps = {
  disabled?: boolean;
};

export const Button = component$(
  (props: ButtonProps & HTMLAttributes<HTMLButtonElement>) => {
    return (
      <HeadlessButton class="btn btn-primary" {...props}>
        <Slot />
      </HeadlessButton>
    );
  }
);
