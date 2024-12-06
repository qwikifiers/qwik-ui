import { component$, useStyles$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  return (
    <Carousel.Root class="carousel-root" gap={30}>
      <div class="carousel-buttons">
        <Carousel.Previous>Prev</Carousel.Previous>
        <Carousel.Next>Next</Carousel.Next>
      </div>
      <Carousel.Scroller class="carousel-scroller">
        <Carousel.Slide style={{ flexBasis: '200px' }} class="carousel-slide">
          red
        </Carousel.Slide>
        <Carousel.Slide style={{ flexBasis: '400px' }} class="carousel-slide">
          green
        </Carousel.Slide>
        <Carousel.Slide style={{ flexBasis: '300px' }} class="carousel-slide">
          blue
        </Carousel.Slide>
        <Carousel.Slide style={{ flexBasis: '350px' }} class="carousel-slide">
          yellow
        </Carousel.Slide>
        <Carousel.Slide style={{ flexBasis: '100px' }} class="carousel-slide">
          purple
        </Carousel.Slide>
      </Carousel.Scroller>
    </Carousel.Root>
  );
});
// internal
import styles from './carousel.css?inline';
