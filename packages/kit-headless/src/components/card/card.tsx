import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';

export type CardProps = QwikIntrinsicElements['div'];

export const Card = component$((props: CardProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
