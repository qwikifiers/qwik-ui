import { component$, PropsOf, Slot } from '@builder.io/qwik';

export type BadgeProps = PropsOf<'div'>;

export const Badge = component$((props: BadgeProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
