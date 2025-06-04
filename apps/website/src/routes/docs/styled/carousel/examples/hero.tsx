import { component$ } from '@builder.io/qwik';
import { Card, Carousel } from '@qwik-ui/styled';

export default component$(() => {
  return (
    <Carousel.Root class="max-w-xs">
      <Carousel.Scroller class="m-2">
        {Array.from({ length: 9 }).map((_, index) => (
          <Carousel.Slide key={index}>
            <div class="px-2 py-3">
              <Card.Root>
                <Card.Content class="flex aspect-square items-center justify-center">
                  <span class="text-4xl font-semibold">{index + 1}</span>
                </Card.Content>
              </Card.Root>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel.Scroller>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel.Root>
  );
});
