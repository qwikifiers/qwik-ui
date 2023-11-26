import { component$, useSignal, useStyles$, $ } from '@builder.io/qwik';

import {
  Carousel,
  CarouselNext,
  CarouselPrev,
  CarouselSlide,
  CarouselView,
  CarouselContainer,
  CarouselPagination,
} from '@qwik-ui/headless';

export default component$(() => {
  /* TODO: document this to always have initial state to null. 
  Use defaultSlide instead for setting a slide on page load */
  const moveToSig = useSignal<number | null>(null);
  const activeIndex = useSignal<number | null>(null);

  const slides = [
    'Slide 1 content',
    'Slide 2 content',
    'Slide 3 content',
    'Slide 4 content',
    'Slide 5 content',
    'Slide 6 content',
    'Slide 7 content',
    'Slide 8 content',
    'Slide 9 content',
    'Slide 10 content',
  ];

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
      transition-property: transform;
      transition-timing-function: ease;
    }

    .qwikui-slide {
      flex: 0 0 var(--slide-size);
      min-width: 0;
      padding-left: var(--slide-spacing);
      position: relative;
      padding-top: 16px;
      padding-bottom: 16px;
      user-select: none;
      transition-property: transform;
    }

    qwikui-slide:nth-child(even) {
      background-color: orange !important;
    }

    .next-button[aria-disabled="true"], .prev-button[aria-disabled="true"] {
      background: rgba(51, 65, 85, .35);
    }
  `);

  const bulletLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  return (
    <>
      <Carousel bind:moveTo={moveToSig} spaceBetweenSlides={30} class="qwikui-carousel">
        <div class="flex gap-4">
          <CarouselPrev class="prev-button bg-slate-700 px-3 py-2">Prev</CarouselPrev>
          <CarouselNext class="next-button bg-slate-700 px-3 py-2">Next</CarouselNext>
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
        <div>
          {bulletLetters.map((letter) => (
            <span>{letter}</span>
          ))}
          {/* <CarouselPagination
            renderBullet$={$((i: number) => {
              return <span>{bulletLetters[i]}</span>;
            })}
            class="mr-2 bg-slate-700 p-2 data-[current-slide]:bg-slate-800"
          /> */}
        </div>
      </Carousel>
      <button onClick$={() => (moveToSig.value = 5)}>Move to 5</button>
    </>
  );
});
