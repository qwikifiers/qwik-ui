import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Carousel, useCarousel } from '@qwik-ui/headless';
import { ExampleNetflix } from './example-netflix';
import styles from './carousel.css?inline';

const { Item, Items, Root } = Carousel;

export default component$(() => {
  const { scopeId } = useStylesScoped$(styles);

  const carousel = useCarousel();

  return (
    <>
      <p>This is the documentation for the Carousel</p>

      <ExampleNetflix />

      <h2>Carousel Example</h2>

      <ul>
        <li>total item: {carousel.items.total.value}</li>
        <li>active item: {carousel.items.active.current.value}</li>
        <li>
          item shown: {carousel.items.visible.first.value + 1} to{' '}
          {carousel.items.visible.last.value + 1}
        </li>
        <li>with focus: {carousel.items.active.current.value + 1}</li>
      </ul>

      <nav style="display: flex; gap: .5em">
        <strong>Pages:</strong>
        {carousel.pages.ranges.value.map(([first], i) => (
          <button key={first} onClick$={() => carousel.items.scrollAt(first)}>
            {i + 1}
          </button>
        ))}
      </nav>
      <nav style="display: flex; gap: .5em">
        <strong>Items:</strong>
        {Array.from({ length: 8 }, (_, i) => i).map((value, i) => (
          <button key={value} onClick$={() => carousel.items.scrollAt(i)}>
            {i + 1}
          </button>
        ))}
      </nav>
      <Root use={carousel}>
        <Items style="gap: 3em;">
          {Array.from({ length: 8 }, (_, i) => i).map((value, i) => (
            <Item key={value} index={i} label={`Image ${i}`} class={[scopeId, 'item']}>
              <img src={`https://picsum.photos/120${i + 1}/55${i}`} alt="" />
            </Item>
          ))}
        </Items>
      </Root>

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
