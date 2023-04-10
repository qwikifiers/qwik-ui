import {
  component$,
  useId,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { Carousel, useCarousel } from '@qwik-ui/headless';
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
  const carousel = useCarousel();

  return (
    <>
      <header>
        <h2>Netflix example</h2>
        <nav>
          <strong>
            {carousel.visible.first.value + 1} /{' '}
            {carousel.visible.last.value + 1}
          </strong>
          <button
            disabled={carousel.active.isFirst.value}
            onClick$={() => carousel.scroll.previous()}
          >
            <IconPrevious />
          </button>
          <button
            disabled={carousel.active.isLast.value}
            onClick$={() => carousel.scroll.next()}
          >
            <IconNext />
          </button>
        </nav>
      </header>
      <Root use={carousel}>
        <Items class={[scopeId, 'carousel']}>
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
                </div>
              </article>
            </Item>
          ))}
        </Items>
      </Root>
    </>
  );
});
