import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';

export type HeadlessAlertProps = HTMLAttributes<HTMLDivElement>;

export const Alert = component$((props: HeadlessAlertProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
