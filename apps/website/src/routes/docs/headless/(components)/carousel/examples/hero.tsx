import { component$, useStyles$ } from '@builder.io/qwik';

import {
  Carousel,
  CarouselNext,
  CarouselPrev,
  CarouselSlide,
  CarouselSlidePicker,
} from '@qwik-ui/headless';

export default component$(() => {
  const slides = ['Slide 1 content', 'Slide 2 content', 'Slide 3 content'];

  useStyles$(`
    .qwikui-carousel {
      --slide-spacing: 1rem;
      --slide-size: 100%;
      --slide-height: 19rem;
      padding: 1.6rem;
    }

    .qwikui-viewport {
      overflow: hidden;
    }

    .qwikui-container {
      backface-visibility: hidden;
      display: flex;
      touch-action: pan-y;
      margin-left: calc(var(--slide-spacing) * -1);
      display: flex;
      gap: 16px;
    }

    .qwikui-slide {
      flex: 0 0 var(--slide-size);
      min-width: 0;
      padding-left: var(--slide-spacing);
      position: relative;
    }
  `);

  return (
    <Carousel class="qwikui-carousel">
      <div class="flex gap-4">
        <CarouselPrev class="bg-slate-700 px-3 py-2">Prev</CarouselPrev>
        <CarouselNext class="bg-slate-700 px-3 py-2">Next</CarouselNext>
      </div>
      <CarouselSlidePicker />
      <div class="qwikui-viewport">
        <div class="qwikui-container">
          {slides.map((content) => (
            <CarouselSlide class="qwikui-slide" key={content}>
              {content}
            </CarouselSlide>
          ))}
        </div>
      </div>
    </Carousel>
  );
});
