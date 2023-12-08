import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
import { CardActions as HeadlessCartActions } from '@qwik-ui/headless';

export type CardActionsProps = HTMLAttributes<HTMLElement>;

export const CardActions = component$((props: CardActionsProps) => (
  /* @ts-expect-error ignore because deprecated */
  <HeadlessCartActions {...props} class="card-actions justify-end">
    <Slot />
  </HeadlessCartActions>
));
