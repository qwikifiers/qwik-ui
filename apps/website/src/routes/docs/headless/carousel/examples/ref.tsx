import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  const firstSlideRef = useSignal<HTMLDivElement>();
  const secondSlideRef = useSignal<HTMLDivElement>();

  return (
    <>
      <Carousel.Root class="carousel-root" gap={30}>
        <div class="carousel-buttons">
          <Carousel.Previous>Prev</Carousel.Previous>
          <Carousel.Next>Next</Carousel.Next>
        </div>
        <Carousel.Scroller class="carousel-scroller">
          <Carousel.Slide class="carousel-slide" ref={firstSlideRef}>
            Option 1
          </Carousel.Slide>

          <Carousel.Slide class="carousel-slide" ref={secondSlideRef}>
            Option 2
          </Carousel.Slide>
        </Carousel.Scroller>
      </Carousel.Root>

      <button
        onClick$={() => {
          if (!firstSlideRef.value) return;
          firstSlideRef.value.style.backgroundColor = '#FFCCCB';
          firstSlideRef.value.style.border = '2px dotted #FF0000';
        }}
      >
        Turn first slide red
      </button>

      <button
        onClick$={() => {
          if (!secondSlideRef.value) return;
          secondSlideRef.value.style.backgroundColor = '#E6F3FF';
        }}
      >
        Turn second slide blue
      </button>
    </>
  );
});
// internal
import styles from './carousel.css?inline';
