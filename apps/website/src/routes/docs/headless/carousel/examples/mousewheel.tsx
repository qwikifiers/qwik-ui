import { component$, useStyles$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];

  useStyles$(`
    .mousewheel-bullet {
        width: 10px;
        height: 10px;
        background: hsl(var(--muted));
    }
        
    .mousewheel-bullet[data-active] {
        background-color: hsl(var(--primary));
    }

    `);

  return (
    <Carousel.Root
      class="carousel-root"
      gap={30}
      orientation="vertical"
      maxSlideHeight={160}
      mousewheel
    >
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
      <Carousel.Pagination
        style={{
          position: 'absolute',
          top: '33%',
          right: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {colors.map((color) => (
          <Carousel.Bullet class="mousewheel-bullet" key={color} />
        ))}
      </Carousel.Pagination>
    </Carousel.Root>
  );
});

// internal
import styles from './carousel.css?inline';
