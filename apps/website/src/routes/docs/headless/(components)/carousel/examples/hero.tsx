import { component$ } from '@builder.io/qwik';

import {
  Carousel,
  CarouselNext,
  CarouselPrev,
  CarouselSlide,
  CarouselSlidePicker,
} from '@qwik-ui/headless';

export default component$(() => {
  const slides = ['Slide 1 content', 'Slide 2 content', 'Slide 3 content'];

  return (
    <Carousel>
      <div class="flex gap-4">
        <CarouselNext class="bg-slate-700 px-3 py-2">Next</CarouselNext>
        <CarouselPrev class="bg-slate-700 px-3 py-2">Prev</CarouselPrev>
      </div>
      <CarouselSlidePicker />
      <div>
        {slides.map((content) => (
          <CarouselSlide key={content}>{content}</CarouselSlide>
        ))}
      </div>
    </Carousel>
  );
});
