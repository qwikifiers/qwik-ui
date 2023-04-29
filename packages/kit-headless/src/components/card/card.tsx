import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';

export type CardProps = HTMLAttributes<HTMLElement>;

export const Card = component$((props: CardProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
