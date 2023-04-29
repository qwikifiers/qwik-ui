import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';

type CardActionsProps = HTMLAttributes<HTMLElement>;

export const CardActions = component$((props: CardActionsProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
