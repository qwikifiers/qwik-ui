import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
import { Card as HeadlessCard } from '@qwik-ui/headless';
import type { OmitSignalClass } from '@qwik-ui/utils';

export type CardProps = OmitSignalClass<HTMLAttributes<HTMLElement>>;

export const Card = component$((props: CardProps) => {
  const { class: classNames, ...rest } = props;
  return (
    /* @ts-expect-error ignore because deprecated */
    <HeadlessCard class={['card bg-base-100 ', classNames]} {...rest}>
      <Slot />
    </HeadlessCard>
  );
});
