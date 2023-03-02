import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';

export type AlertProps = HTMLAttributes<HTMLDivElement>;

export const Alert = component$((props: AlertProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
