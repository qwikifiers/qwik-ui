import { component$, useStyles$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];

  return (
    <div style={{ maxHeight: '1000px', overflow: 'scroll' }}>
      <ul style={{ height: '10000px' }}>
        <Carousel.Root class="carousel-root" gap={30}>
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
        </Carousel.Root>
        <div></div>
      </ul>
    </div>
  );
});
// internal
import styles from './carousel.css?inline';
