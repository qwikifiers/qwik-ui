import { component$, HTMLAttributes, QwikIntrinsicElements } from '@builder.io/qwik';
import { CardImage as HeadlessCardImage } from '@qwik-ui/headless';
export type HTMLImgProps = QwikIntrinsicElements['img'];

type CardImageProps = HTMLAttributes<HTMLElement> & HTMLImgProps;

export const CardImage = component$((props: CardImageProps) => (
  /* @ts-expect-error ignore because deprecated */
  <HeadlessCardImage {...props} />
));
