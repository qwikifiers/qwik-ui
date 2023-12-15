import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';

export type BadgeProps = QwikIntrinsicElements['div'];

export const Badge = component$((props: BadgeProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
