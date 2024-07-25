import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';
import { LuPause, LuPlay } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);

  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];
  const isPlaying = useSignal<boolean>(false);

  return (
    <>
      <Carousel.Root
        class="carousel-root"
        gap={30}
        autoPlayIntervalMs={2000}
        bind:autoplay={isPlaying}
      >
        <div class="carousel-buttons">
          <Carousel.Previous>Prev</Carousel.Previous>
          <Carousel.Player>{isPlaying.value ? <LuPause /> : <LuPlay />}</Carousel.Player>
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
      <p>isPlaying: {isPlaying.value.toString()}</p>
      <button onClick$={() => (isPlaying.value = !isPlaying.value)}>
        Toggle autoplay
      </button>
    </>
  );
});
// internal
import styles from './carousel.css?inline';
