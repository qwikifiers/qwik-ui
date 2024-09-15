import { component$, useStyles$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];

  useStyles$(`
    .carousel-circle {
        width: 20px;
        height: 20px;
        margin: 0 5px;
        border-radius: 50%;
        background-color: lightgray;
    }

    .carousel-circle[data-active] {
        background-color: lightblue;
    }      
  `);

  return (
    <Carousel.Root class="carousel-root" gap={30} move={2} slidesPerView={2}>
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

      <Carousel.Pagination style={{ display: 'flex', justifyContent: 'center' }}>
        {colors.map((_, index) => {
          return <Carousel.Bullet key={index} class="carousel-circle"></Carousel.Bullet>;
        })}
      </Carousel.Pagination>
    </Carousel.Root>
  );
});
// internal
import styles from './carousel.css?inline';
