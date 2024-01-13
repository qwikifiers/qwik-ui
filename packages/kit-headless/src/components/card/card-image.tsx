import { component$, HTMLAttributes, PropsOf } from '@builder.io/qwik';

export type HTMLImgProps = PropsOf<'img'>;

type CardImageProps = HTMLAttributes<HTMLElement> & HTMLImgProps;

export const CardImage = component$((props: CardImageProps) => {
  return (
    <figure>
      <img {...props} />
    </figure>
  );
});
