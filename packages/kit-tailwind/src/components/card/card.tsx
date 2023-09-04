import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
import { Card as HeadlessCard } from '@qwik-ui/headless';

export type CardProps = HTMLAttributes<HTMLElement>;

// TODO: discuss this

export const Card = component$((props: CardProps) => {
  const { class: classNames, ...rest } = props;
  return (
    <HeadlessCard class={['card bg-base-100 ', classNames]} {...rest}>
      <Slot />
    </HeadlessCard>
  );
});
