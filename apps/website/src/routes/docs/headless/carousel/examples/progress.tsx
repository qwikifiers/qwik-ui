import { component$, PropsOf, useSignal, useStyles$ } from '@qwik.dev/core';
import { Carousel, Progress } from '@qwik-ui/headless';
import styles from '../../progress/snippets/progress.css?inline';

export const CarouselProgress = component$((props: PropsOf<typeof Progress.Root>) => {
  useStyles$(styles);

  return (
    <Progress.Root {...props} class="progress" style={{ marginBottom: '2rem' }}>
      <Progress.Indicator class="progress-indicator" />
    </Progress.Root>
  );
});

export default component$(() => {
  useStyles$(styles);

  const progress = useSignal(0);
  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];

  return (
    <>
      <CarouselProgress bind:value={progress} />
      <Carousel.Root class="carousel-root" bind:progress={progress}>
        <div class="carousel-buttons">
          <Carousel.Previous>Prev</Carousel.Previous>
          <Carousel.Next>Next</Carousel.Next>
        </div>
        {colors.map((color) => (
          <Carousel.Slide key={color} class="carousel-slide">
            {color}
          </Carousel.Slide>
        ))}
      </Carousel.Root>
    </>
  );
});
// internal
