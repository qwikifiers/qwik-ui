import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';

import { Carousel } from '@qwik-ui/headless';
import carouselStyles from './carousel.css?inline';

export default component$(() => {
  /* TODO: document this to always have initial state to null.
  Use defaultSlide instead for setting a slide on page load */
  const currentIndexSig = useSignal<number>(0);
  const renderCarousel = useSignal(false);
  useStyles$(carouselStyles);

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <button onClick$={() => (renderCarousel.value = true)}>Render Carousel</button>
      {renderCarousel.value && (
        <Carousel.Root
          bind:currSlideIndex={currentIndexSig}
          spaceBetweenSlides={30}
          class="carousel"
        >
          <div class="carousel-buttons">
            <Carousel.Prev class="prev-button">Prev</Carousel.Prev>
            <Carousel.Next class="next-button">Next</Carousel.Next>
          </div>
          <Carousel.View>
            <Carousel.Container class="carousel-container">
              {nums.map((num, index) => (
                <Carousel.Slide key={num} class="carousel-slide">
                  {index}
                </Carousel.Slide>
              ))}
            </Carousel.Container>
          </Carousel.View>
          <div>
            <Carousel.Pagination
              class="carousel-pagination"
              renderBullet$={$((i: number) => {
                return (
                  <div
                    class={`carousel-pagination-bullet ${
                      currentIndexSig.value === i ? 'pagination-underline' : ''
                    }`}
                    onClick$={() => (currentIndexSig.value = i)}
                  >
                    {i}
                  </div>
                );
              })}
            />
          </div>
        </Carousel.Root>
      )}
    </>
  );
});
