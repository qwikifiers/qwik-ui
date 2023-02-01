import { component$, Slot } from '@builder.io/qwik';

interface CardActionsProps {
  class?: string;
  className?: string;
}

export const CardActions = component$((props: CardActionsProps) => {
  return (
    <div class="card-actions" {...props}>
      <Slot />
    </div>
  );
});
