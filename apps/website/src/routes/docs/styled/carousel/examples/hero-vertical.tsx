import { component$ } from '@builder.io/qwik';
import { Card, Carousel } from '@qwik-ui/styled';
import { LuChevronDown } from '@qwikest/icons/lucide';
import { LuChevronUp } from '@qwikest/icons/lucide';

export default component$(() => {
  return (
    <Carousel.Root
      class="w-full"
      orientation="vertical"
      maxSlideHeight={360}
      slidesPerView={3}
    >
      <Carousel.Scroller class="m-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Carousel.Slide key={index}>
            <div class="p-1">
              <Card.Root>
                <Card.Content class="flex w-full items-center justify-center pt-6">
                  <span class="text-4xl font-semibold">{index + 1}</span>
                </Card.Content>
              </Card.Root>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel.Scroller>
      <Carousel.Previous>
        <LuChevronUp class="size-10" />
      </Carousel.Previous>
      <Carousel.Next>
        <LuChevronDown class="size-10" />
      </Carousel.Next>
    </Carousel.Root>
  );
});
