import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
import { CardTitle as HeadlessCardTitle } from '@qwik-ui/headless';

export type CardTitleProps = HTMLAttributes<HTMLElement>;

export const CardTitle = component$((props: CardTitleProps) => (
  <HeadlessCardTitle {...props} class="text-2xl underline">
    <Slot />
  </HeadlessCardTitle>
));
