import { component$, useStyles$ } from '@builder.io/qwik';

import {
  Carousel,
  CarouselNext,
  CarouselPrev,
  CarouselSlide,
  CarouselView,
  CarouselContainer,
} from '@qwik-ui/headless';

export default component$(() => {
  const slides = ['Slide 1 content', 'Slide 2 content', 'Slide 3 content'];

  useStyles$(`
    .qwikui-carousel {
      --slide-spacing: 0rem;
      --slide-size: 100%;
      --slide-height: 19rem;
      padding: 1.6rem;
    }

    .qwikui-container {
      backface-visibility: hidden;
      display: flex;
      touch-action: pan-y;
      margin-left: calc(var(--slide-spacing) * -1);
      display: flex;

    }

    .qwikui-slide {
      flex: 0 0 var(--slide-size);
      min-width: 0;
      padding-left: var(--slide-spacing);
      position: relative;
      padding-top: 16px;
      padding-bottom: 16px;
      user-select: none;
    }
  `);

  return (
    <Carousel spaceBetween={30} class="qwikui-carousel">
      <div class="flex gap-4">
        <CarouselPrev class="bg-slate-700 px-3 py-2">Prev</CarouselPrev>
        <CarouselNext class="bg-slate-700 px-3 py-2">Next</CarouselNext>
      </div>
      <CarouselView class="bg-slate-500">
        <CarouselContainer class="qwikui-container">
          {slides.map((content) => (
            <CarouselSlide
              class="qwikui-slide noselect bg-white text-black"
              key={content}
            >
              {content}
            </CarouselSlide>
          ))}
        </CarouselContainer>
      </CarouselView>
    </Carousel>
  );
});
