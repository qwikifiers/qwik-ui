import { component$ } from '@builder.io/qwik';
import { Card, Carousel } from '@qwik-ui/styled';

export default component$(() => {
  return (
    <Carousel.Root class="max-w-xs sm:max-w-sm">
      <Carousel.Scroller>
        {Array.from({ length: 5 }).map((_, index) => (
          <Carousel.Slide key={index}>
            <div class="p-1">
              <Card.Root>
                <Card.Content class="flex aspect-square items-center justify-center">
                  <span class="text-4xl font-semibold">{index + 1}</span>
                </Card.Content>
              </Card.Root>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel.Scroller>
      <Carousel.Pagination>
        <Carousel.Bullet />
        <Carousel.Bullet />
        <Carousel.Bullet />
        <Carousel.Bullet />
        <Carousel.Bullet />
      </Carousel.Pagination>
    </Carousel.Root>
  );
});
