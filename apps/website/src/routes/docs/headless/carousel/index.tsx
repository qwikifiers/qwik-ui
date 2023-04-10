import {
  component$,
  useId,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { Carousel, useCarousel } from '@qwik-ui/headless';

const {
  Controls,
  Control,
  Item,
  Items,
  Root,
  ButtonNext,
  ButtonPrevious,
  IconNext,
  IconPrevious,
} = Carousel;

export const ITEMS: { src: string; title: string }[] = Array.from({
  length: 9,
}).map((_, i) => ({
  src: `https://picsum.photos/120${i + 1}/55${i}`,
  title: 'My great image',
}));

export default component$(() => {
  const { scopeId } = useStylesScoped$(`
    h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
    h2 { margin-block: 1.15em 0.5em; font-size: xx-large; }
    h3 { margin-block: 0.85em 0.35em; font-size: x-large; }
    hr { margin-block: 2em; }

    .form-item { width: 35em; }

    .outter {
      display: grid;
    }

    .inner {
      display: flex;
      align-items: center;
    }

    .controls { 
      padding: 2em;
      margin-inline: auto;
      display: flex;
      justify-content: center;
      gap: 0.5em;
    }

    .control {
      width: 2em;
      aspect-ratio: 1/1;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .3s .1s ease-out;
      cursor: pointer;
    }

    .control[aria-current="true"] {
      font-weight: 900;
    }

    .img {
      height: 500px;
      object-fit: cover;
    }

    .item {
      width: 350px;
    }

    .item:nth-child(8),
    .item:nth-child(6),
    .item:nth-child(2) {
      width: 100px;
    }

    .item:nth-child(5),
    .item:nth-child(3) {
      width: 150px;
    }
  `);

  const items = useSignal(ITEMS);

  const carousel = useCarousel({ loop: false });
  const carousel2 = useCarousel();

  return (
    <>
      <p>This is the documentation for the Carousel</p>

      <h2>Carousel Example</h2>

      <ul>
        <li>total item: {carousel.count.value}</li>
        <li>active item: {carousel.active.index.value}</li>
        <li>
          item shown: {carousel.visible.first.value + 1} to{' '}
          {carousel.visible.last.value + 1}
        </li>
        <li>with focus: {carousel.active.index.value + 1}</li>
      </ul>

      <Root use={carousel}>
        <div class="inner">
          <ButtonPrevious>
            <IconPrevious />
          </ButtonPrevious>
          <Items style="gap: 3em;">
            {items.value.map(({ src, title }, i) => (
              <Item
                key={useId()}
                index={i}
                label={title}
                class={[scopeId, 'item']}
                style={`background-image: url(${src})`}
              >
                <img src={src} alt="" />
              </Item>
            ))}
          </Items>
          <ButtonNext>
            <IconNext />
          </ButtonNext>
        </div>

        <Controls class={[scopeId, 'controls']}>
          {carousel.pages.ranges.value.map(([start], i) => (
            <Control key={useId()} index={start} class={[scopeId, 'control']}>
              <>{i + 1}</>
            </Control>
          ))}
        </Controls>

        <Controls class={[scopeId, 'controls']}>
          {items.value.map((_, i) => (
            <Control key={useId()} index={i} class={[scopeId, 'control']}>
              <>{i + 1}</>
            </Control>
          ))}
        </Controls>
      </Root>

      <Root use={carousel2}>
        <div class="inner">
          <ButtonPrevious>
            <IconPrevious />
          </ButtonPrevious>
          <Items style="gap: 3em;">
            {items.value.map(({ src, title }, i) => (
              <Item
                key={useId()}
                index={i}
                label={title}
                class={[scopeId, 'item']}
                style={`background-image: url(${src}); width: 100%;`}
              >
                <h1>Lorem Ipsum</h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
                  pariatur excepturi vero magnam aliquid
                </p>
                <a href="#">Click me</a>
              </Item>
            ))}
          </Items>
          <ButtonNext>
            <IconNext />
          </ButtonNext>
        </div>

        <Controls class={[scopeId, 'controls']}>
          {carousel2.pages.ranges.value.map(([start], i) => (
            <Control key={useId()} index={start} class={[scopeId, 'control']}>
              <>{i + 1}</>
            </Control>
          ))}
        </Controls>

        <Controls class={[scopeId, 'controls']}>
          {items.value.map((_, i) => (
            <Control key={useId()} index={i} class={[scopeId, 'control']}>
              <>{i + 1}</>
            </Control>
          ))}
        </Controls>
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
