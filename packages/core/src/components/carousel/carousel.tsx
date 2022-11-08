import { component$, Slot } from '@builder.io/qwik';
import { CarouselItem } from './carousel-item';

interface CarouselProps {
  images?: Image[];
  withIndicators?: boolean;
}

interface Image {
  src: string;
  alt: string;
}

export const Carousel = component$(({ images, withIndicators = true, ...props }: CarouselProps) => {
  return (
    <>
      <div class="carousel w-full rounded-box" {...props}>
        { images ?
        images.map(({ src, alt }: Image, i: number) => (
          <CarouselItem src={src} alt={alt} index={i} />
        )) : <Slot />}
      </div>
      {withIndicators ?
        (images ? <div class="flex justify-center w-full py-2 gap-2">
          {images?.map((_, i: number) => (
            <a preventdefault:click href={`#item${i}`} class="btn btn-xs">
              {i + 1}
            </a>
          ))}
          </div> : <Slot name="indicators"/>)
        : undefined
      }
    </>
  );
});
