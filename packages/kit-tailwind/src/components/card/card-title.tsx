import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
import { CardTitle as HeadlessCardTitle } from '@qwik-ui/headless';

export type CardTitleProps = HTMLAttributes<HTMLElement>;

export const CardTitle = component$((props: CardTitleProps) => (
  /* @ts-expect-error ignore because deprecated */
  <HeadlessCardTitle {...props} class="card-title">
    <Slot />
  </HeadlessCardTitle>
));
