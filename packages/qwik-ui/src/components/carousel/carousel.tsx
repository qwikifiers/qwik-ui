import { component$ } from '@builder.io/qwik';

interface CarouselProps {
  images: Image[];
}

interface Image {
  src: string;
  alt: string;
}

export const Carousel = component$(({ images }: CarouselProps) => {
  return (
    <>
      <div class="carousel w-full">
        {images.map(({ src, alt }: Image, i: number) => (
          <div id={`item${i}`} class="carousel-item w-full">
            <img src={src} alt={alt} class="w-full" />
          </div>
        ))}
      </div>
      <div class="flex justify-center w-full py-2 gap-2">
        {images.map((_, i: number) => (
          <a href={`#item${i}`} class="btn btn-xs">
            {i + 1}
          </a>
        ))}
      </div>
    </>
  );
});
