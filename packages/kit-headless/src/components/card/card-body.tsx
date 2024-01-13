import { component$, PropsOf, Slot } from '@builder.io/qwik';

type CardBodyProps = PropsOf<'div'>;

export const CardBody = component$((props: CardBodyProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
