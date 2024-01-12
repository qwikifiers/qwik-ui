import { component$, PropsOf, Slot } from '@builder.io/qwik';

type CardActionsProps = PropsOf<'div'>;

export const CardActions = component$((props: CardActionsProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
