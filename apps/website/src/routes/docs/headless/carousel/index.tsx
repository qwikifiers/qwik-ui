import { component$, useId, useStylesScoped$ } from '@builder.io/qwik';
import { Carousel, useCarousel } from '@qwik-ui/headless';
import { ExampleNetflix } from './example-netflix';
import styles from './carousel.css?inline';

const { Item, Items, Root } = Carousel;

export default component$(() => {
  const { scopeId } = useStylesScoped$(styles);

  // const carousel = useCarousel({ loop: false });

  return (
    <>
      <p>This is the documentation for the Carousel</p>

      <ExampleNetflix />

      <h2>Carousel Example</h2>

      {/* <ul>
        <li>total item: {carousel.count.value}</li>
        <li>active item: {carousel.active.index.value}</li>
        <li>
          item shown: {carousel.visible.first.value + 1} to{' '}
          {carousel.visible.last.value + 1}
        </li>
        <li>with focus: {carousel.active.index.value + 1}</li>
      </ul>

      <nav style="display: flex; gap: .5em">
        <strong>Pages:</strong>
        {carousel.pages.ranges.value.map(([first], i) => (
          <button key={useId()} onClick$={() => carousel.scroll.to(first)}>
            {i + 1}
          </button>
        ))}
      </nav>
      <nav style="display: flex; gap: .5em">
        <strong>Items:</strong>
        {Array.from({ length: 8 }).map((_, i) => (
          <button key={useId()} onClick$={() => carousel.scroll.to(i)}>
            {i + 1}
          </button>
        ))}
      </nav>
      <Root use={carousel}>
        <Items style="gap: 3em;">
          {Array.from({ length: 8 }).map((_, i) => (
            <Item
              key={useId()}
              index={i}
              label={`Image ${i}`}
              class={[scopeId, 'item']}
            >
              <img src={`https://picsum.photos/120${i + 1}/55${i}`} alt="" />
            </Item>
          ))}
        </Items>
      </Root> */}

      <hr />

      <h3>Inputs</h3>

      <ul>
        <li>startAt: number, default 0</li>
        <li>loop: boolean, default true</li>
      </ul>

      <h3>Parts</h3>

      <ul>
        <li>Root</li>
        <li>Items & Item</li>
        <li>ButtonPrevious</li>
        <li>ButtonNext</li>
        <li>Controls & Control</li>
      </ul>

      <hr />

      <h3>Outputs</h3>

      <ul>
        <li></li>
      </ul>
    </>
  );
});
