import { component$, HTMLAttributes, Slot, useStylesScoped$ } from '@builder.io/qwik';

export type CardProps = HTMLAttributes<HTMLElement>;

export const Card = component$(
  (props: CardProps) => {

    return (
      <div {...props} >
        <Slot />
      </div>
    );
  }
);

