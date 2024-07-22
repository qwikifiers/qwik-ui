import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];
  const currSlideIndex = useSignal(0);

  return (
    <Carousel.Root
      bind:currSlideIndex={currSlideIndex}
      class="carousel-root"
      spaceBetweenSlides={30}
    >
      <div class="carousel-buttons">
        <Carousel.Previous class="prev-button">Prev</Carousel.Previous>
        <Carousel.Next class="next-button">Next</Carousel.Next>
      </div>
      <Carousel.Scroller class="carousel-container">
        {colors.map((color) => (
          <Carousel.Slide key={color} class="carousel-slide">
            {color}
          </Carousel.Slide>
        ))}
      </Carousel.Scroller>
      <Carousel.Pagination class="carousel-pagination">
        {colors.map((color, index) => (
          <Carousel.Bullet class="carousel-pagination-bullet" key={color}>
            {index + 1}
          </Carousel.Bullet>
        ))}
      </Carousel.Pagination>
    </Carousel.Root>
  );
});
// internal
import styles from './carousel.css?inline';
