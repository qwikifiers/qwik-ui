import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
type CardBodyProps = QwikIntrinsicElements['div'];

export const CardBody = component$((props: CardBodyProps) => {
  return (
    <div class="card-body" {...props}>
      <Slot />
    </div>
  );
});
