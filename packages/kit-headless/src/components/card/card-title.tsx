import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';

type CardTitleProps = HTMLAttributes<HTMLElement>;

export const CardTitle = component$((props: CardTitleProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
