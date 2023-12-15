import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';

type CardActionsProps = QwikIntrinsicElements['div'];

export const CardActions = component$((props: CardActionsProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
