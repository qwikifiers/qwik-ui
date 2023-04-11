import {
  $,
  QwikIntrinsicElements,
  component$,
  useId,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { Carousel, useCarousel, CarouselContext } from '@qwik-ui/headless';
import styles from './example-netflix.css?inline';

const { Item, Items, Root, IconNext, IconPrevious } = Carousel;

const media = {
  title: 'Qwik Workshop - Live Coding',
  rating: 100,
  banner: 'https://i.ytimg.com/vi/GHbNaDSWUX8/maxresdefault.jpg',
  description: 'Lorem ipsum',
};

export const ExampleNetflix = component$(() => {
  const { scopeId } = useStylesScoped$(styles);
  const items = useSignal([...new Array(10)]);
  const carousel = useCarousel({ loop: false });

  return (
    <>
      <header>
        <h2>Netflix example</h2>
        <Navigation carousel={carousel} class={scopeId} />
      </header>

      <hr />

      <Root use={carousel}>
        <Items class={[scopeId, 'qui-carousel']}>
          {items.value.map((_, i) => (
            <Item
              key={useId()}
              index={i}
              label={media.title}
              class={[scopeId, 'carousel__card']}
              onClick$={() => (carousel.active.index.value = i)}
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

export const Navigation = component$(
  ({ carousel, ...props }: NavigationProps) => {
    const previous = $(() => {
      if (!carousel.loop && carousel.active.isFirst.value) {
        return;
      }
      carousel.scroll.previous();
    });

    const next = $(() => {
      if (!carousel.loop && carousel.active.isLast.value) {
        return;
      }
      carousel.scroll.next();
    });

    return (
      <nav {...props}>
        {carousel.active.index.value + 1} / {carousel.count.value} total
        <button
          class={props.class}
          disabled={carousel.active.isFirst.value}
          onClick$={previous}
        >
          <IconPrevious />
        </button>
        {carousel.visible.first.value + 1}-{carousel.visible.last.value + 1}
        <button
          class={props.class}
          disabled={carousel.active.isLast.value}
          onClick$={next}
        >
          <IconNext />
        </button>
      </nav>
    );
  }
);
