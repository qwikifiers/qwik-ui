import { component$, useStyles$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];

  return (
    <Carousel.Root class="carousel-root" slidesPerView={3} gap={30}>
      <div class="carousel-buttons">
        <Carousel.Previous>Prev</Carousel.Previous>
        <Carousel.Next>Next</Carousel.Next>
      </div>
      <Carousel.Scroller class="carousel-scroller">
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
