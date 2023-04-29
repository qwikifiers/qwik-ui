import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
import { Card as HeadlessCard } from '@qwik-ui/headless';
import { clsq } from '@qwik-ui/shared';

export type CardProps = HTMLAttributes<HTMLElement>;

export const Card = component$((props: CardProps) => {
  const { class: classNames, ...rest } = props;
  return (
    <HeadlessCard class={clsq('card bg-base-100 ', classNames)} {...rest}>
      <Slot />
    </HeadlessCard>
  );
});
