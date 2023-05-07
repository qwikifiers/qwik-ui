import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';

export type BadgeProps = HTMLAttributes<HTMLElement>;

export const Badge = component$((props: BadgeProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
