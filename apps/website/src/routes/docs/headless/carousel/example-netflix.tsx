import {
  $,
  QwikIntrinsicElements,
  component$,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { Carousel, useCarousel, CarouselContext } from '@qwik-ui/headless';
import styles from './example-netflix.css?inline';

const { Item, Items, Root, IconNext, IconPrevious, IconChevronLeft, IconChevronRight } =
  Carousel;

const media = {
  title: 'Qwik Workshop - Live Coding',
  rating: 100,
  banner: 'https://i.ytimg.com/vi/GHbNaDSWUX8/maxresdefault.jpg',
  description: 'Lorem ipsum',
};

export const ExampleNetflix = component$(() => {
  const { scopeId } = useStylesScoped$(styles);
  const items = useSignal([...new Array(10).fill(1).map((_, i) => i + 1)]);
  const carousel = useCarousel({ loop: false, transition: 350, startAt: 3 });

  return (
    <>
      <header>
        <h2>Netflix example</h2>
        <Navigation carousel={carousel} class={scopeId} />
      </header>

      <hr />

      <Root use={carousel}>
        <Items class={[scopeId, 'qui-carousel']}>
          {items.value.map((value, i) => (
            <Item
              key={value}
              index={i}
              label={media.title}
              class={[scopeId, 'carousel__card']}
              onClick$={() => carousel.items.scrollAt(i)}
            >
              <article>
                <img src={media.banner} alt="img" />
                <div class="inner" role="presentation">
                  <h3>{media.title}</h3>
                  <div class="rate">{`${media.rating}% 👍`}</div>
                  <p>{media.description}</p>
                  <a href="#">Read more</a>
                </div>
              </article>
            </Item>
          ))}
        </Items>
      </Root>
    </>
  );
});

type NavigationProps = QwikIntrinsicElements['nav'] & {
  carousel: CarouselContext;
};

export const Navigation = component$(({ carousel, ...props }: NavigationProps) => {
  const previous = $(() => {
    if (!carousel.loop && carousel.items.active.isFirst.value) {
      return;
    }
    carousel.items.previous();
  });

  const next = $(() => {
    if (!carousel.loop && carousel.items.active.isLast.value) {
      return;
    }
    carousel.items.next();
  });

  return (
    <nav {...props}>
      {carousel.items.active.current.value + 1} / {carousel.items.total.value} total
      <button
        class={props.class}
        disabled={!carousel.loop && carousel.items.active.isFirst.value}
        onClick$={carousel.pages.previous}
      >
        <IconChevronLeft />
      </button>
      <button
        class={props.class}
        disabled={!carousel.loop && carousel.items.active.isFirst.value}
        onClick$={previous}
      >
        <IconPrevious />
      </button>
      {carousel.items.visible.first.value + 1}-{carousel.items.visible.last.value + 1}
      <button
        class={props.class}
        disabled={!carousel.loop && carousel.items.active.isLast.value}
        onClick$={next}
      >
        <IconNext />
      </button>
      <button
        class={props.class}
        disabled={!carousel.loop && carousel.items.active.isLast.value}
        onClick$={carousel.pages.next}
      >
        <IconChevronRight />
      </button>
    </nav>
  );
});
