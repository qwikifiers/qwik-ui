import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
import { CardActions as HeadlessCartActions } from '@qwik-ui/headless';

export type CardActionsProps = HTMLAttributes<HTMLElement>;

export const CardActions = component$((props: CardActionsProps) => (
  <HeadlessCartActions {...props} class="card-actions mt-3 justify-start">
    <Slot />
  </HeadlessCartActions>
));
