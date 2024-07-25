import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];
  const selectedIndex = useSignal<number>(0);

  return (
    <>
      <Carousel.Root class="carousel-root" gap={30} bind:selectedIndex={selectedIndex}>
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
      <button>Selected Index: {selectedIndex.value}</button>
      <button onClick$={() => (selectedIndex.value = 4)}>Change to index 4</button>
    </>
  );
});
// internal
import styles from './carousel.css?inline';
