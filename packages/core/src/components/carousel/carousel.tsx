import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { CarouselItem } from './carousel-item';
import { WithClassesProp } from '../../types';

interface CarouselProps extends WithClassesProp {
  images?: Image[];
  withIndicators?: boolean;
}

interface Image {
  src: string;
  alt: string;
}

export const Carousel = component$(
  ({
    images,
    withIndicators = true,
    class: classProp = '',
    className = '',
    ...props
  }: CarouselProps) => {
    const cssClass = cn('carousel w-full rounded-box', classProp, className);
    return (
      <>
        <div class={cssClass} {...props}>
          {images ? (
            images.map(({ src, alt }: Image, i: number) => (
              <CarouselItem src={src} alt={alt} index={i} />
            ))
          ) : (
            <Slot />
          )}
        </div>
        {withIndicators ? (
          images ? (
            <div class="flex justify-center w-full py-2 gap-2">
              {images?.map((_, i: number) => (
                <a preventdefault:click href={`#item${i}`} class="btn btn-xs">
                  {i + 1}
                </a>
              ))}
            </div>
          ) : (
            <Slot name="indicators" />
          )
        ) : undefined}
      </>
    );
  }
);
