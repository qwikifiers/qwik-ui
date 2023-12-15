import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';

type CardBodyProps = QwikIntrinsicElements['div'];

export const CardBody = component$((props: CardBodyProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
