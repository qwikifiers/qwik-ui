import { component$, PropFunction, QwikMouseEvent, Slot } from '@builder.io/qwik';
import { Button as HeadlessButton } from '@qwik-ui/headless';

interface ButtonProps {
  class?: string;
  disabled?: boolean;
}

export const Button = component$((props: ButtonProps) => {
    return (
      <HeadlessButton class="btn btn-primary" {...props}><Slot /></HeadlessButton>
    );
  }
);
