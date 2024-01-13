import { component$, PropsOf, Slot } from '@builder.io/qwik';

export type CardProps = PropsOf<'div'>;

export const Card = component$((props: CardProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
