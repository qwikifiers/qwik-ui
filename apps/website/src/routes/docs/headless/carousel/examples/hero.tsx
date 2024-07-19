import { component$, useStyles$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];

  return (
    <Carousel.Root class="carousel-root">
      <div class="carousel-buttons">
        <Carousel.Previous class="prev-button">Prev</Carousel.Previous>
        <Carousel.Next class="next-button">Next</Carousel.Next>
      </div>
      <Carousel.View>
        <Carousel.Container class="carousel-container">
          {colors.map((color) => (
            <Carousel.Slide key={color} class="carousel-slide">
              {color}
            </Carousel.Slide>
          ))}
        </Carousel.Container>
      </Carousel.View>
    </Carousel.Root>
  );
});
// internal
import styles from './carousel.css?inline';
