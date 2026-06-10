import { component$, useStyles$ } from '@qwik.dev/core';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  return (
    <Carousel.Root class="carousel-root" gap={30}>
      <Carousel.Stepper class="carousel-stepper">
        {Array.from({ length: 3 }).map((_, index) => (
          <Carousel.Step as="div" class="carousel-step">
            Header {index + 1}
          </Carousel.Step>
        ))}
      </Carousel.Stepper>

      <Carousel.Scroller class="carousel-scroller">
        {Array.from({ length: 3 }).map((_, index) => (
          <Carousel.Slide class="carousel-slide">Content {index + 1}</Carousel.Slide>
        ))}
      </Carousel.Scroller>
    </Carousel.Root>
  );
});
// internal
import styles from './carousel.css?inline';
