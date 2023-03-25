import { $, component$, useSignal } from '@builder.io/qwik';

interface CarouselProps {
  images: Array<{
    image: string;
    thumbnail: string;
  }>;
}

export const useCarousel = (
  images: Array<{
    image: string;
    thumbnail: string;
  }>
) => {
  const activeSlideIndex = useSignal(0);

  const next = $(() =>
    activeSlideIndex.value < images.length - 1
      ? (activeSlideIndex.value += 1)
      : (activeSlideIndex.value = 0)
  );

  const prev = $(() =>
    activeSlideIndex.value > 0
      ? (activeSlideIndex.value -= 1)
      : (activeSlideIndex.value = images.length - 1)
  );

  const jumpTo = $((i: number) => (activeSlideIndex.value = i));

  return {
    activeSlideIndex,
    next,
    prev,
    jumpTo,
  };
};

export const Carousel = component$(({ images }: CarouselProps) => {
  const { activeSlideIndex, next, prev, jumpTo } = useCarousel(images);

  return (
    <div>
      <div class="relative flex justify-center bg-white w-[495px] h-[384px]">
        {images.map((image, i) => (
          <img
            key="image"
            class={`object-contain h-96 w-auto ${
              i === activeSlideIndex.value ? 'block' : 'hidden'
            }`}
            src={image.image}
          />
        ))}
        <a
          class="absolute cursor-pointer top-1/2 w-auto -mt-[22px] p-4 text-gray-500 font-bold text-lg transition-all duration-1000 select-none left-0"
          onClick$={() => prev()}
        >
          &#10094;
        </a>
        <a
          class="absolute cursor-pointer top-1/2 w-auto -mt-[22px] p-4 text-gray-500 font-bold text-lg transition-all duration-500 select-none right-0"
          onClick$={() => next()}
        >
          &#10095;
        </a>
      </div>
      <div class="grid grid-cols-5 gap-4 mt-2">
        {images.map((image, i) => (
          <b
            key="image"
            class={`${i === activeSlideIndex.value ? 'border' : ''}`}
          >
            <img
              src={image.thumbnail}
              alt={'Product image'}
              class=""
              onClick$={() => jumpTo(i)}
            />
          </b>
        ))}
      </div>
    </div>
  );
});
