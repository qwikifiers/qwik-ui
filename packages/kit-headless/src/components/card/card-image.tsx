import { component$, HTMLAttributes, QwikIntrinsicElements } from '@builder.io/qwik';

export type HTMLImgProps = QwikIntrinsicElements['img'];

type CardImageProps = HTMLAttributes<HTMLElement> & HTMLImgProps;

export const CardImage = component$((props: CardImageProps) => {
  return (
    <figure>
      <img {...props} />
    </figure>
  );
});
