import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { Button as HeadlessButton } from '@qwik-ui/headless';

export type ButtonProps = QwikIntrinsicElements['button'];

export const Button = component$(
  (props: ButtonProps) => {
    return (
      <HeadlessButton mat-button color="primary" {...props}>
        <Slot />
      </HeadlessButton>
    );
  }
);
