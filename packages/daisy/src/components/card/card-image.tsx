import { component$, HTMLAttributes, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import {
  CardImage as HeadlessCardImage,
} from '@qwik-ui/headless';
export type HTMLImgProps = QwikIntrinsicElements['img'];

type CardImageProps = HTMLAttributes<HTMLElement> & HTMLImgProps;


export const CardImage = component$(
  (props: CardImageProps) => (
    <HeadlessCardImage {...props} />
  )
)
