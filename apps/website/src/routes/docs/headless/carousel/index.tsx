import {
  component$,
  useId,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

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
  length: 4,
}).map(() => ({
  src: 'https://picsum.photos/1200/550',
  title: 'My great image',
}));

export default component$(() => {
  const { scopeId } = useStylesScoped$(`
    h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
    h2 { margin-block: 1.15em 0.5em; font-size: xx-large; }
    h3 { margin-block: 0.85em 0.35em; font-size: x-large; }
    hr { margin-block: 2em; }

    .form-item, hr { width: 35em; }

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

    .item {
      height: 500px;
      width: 100%; 
      object-fit: cover;
    }
  `);

  const items = useSignal(ITEMS);

  return (
    <>
      <p>This is the documentation for the Carousel</p>

      <h2>Carousel Example</h2>

      <Root class="outter" startAt={1} loop={false}>
        <div class="inner">
          <ButtonPrevious>
            <IconPrevious />
          </ButtonPrevious>
          <Items>
            {items.value.map(({ src, title }, i) => (
              <Item key={useId()} index={i} label={title}>
                <img src={src} class="item" />
              </Item>
            ))}
          </Items>
          <ButtonNext>
            <IconNext />
          </ButtonNext>
        </div>
        <Controls class={[scopeId, 'controls']}>
          {items.value.map((_, i) => (
            <Control key={useId()} index={i} class={[scopeId, 'control']}>
              {i + 1}
            </Control>
          ))}
        </Controls>
      </Root>

      <hr />

      <h3>Inputs</h3>

      <ul>
        <li>startAt: number, default 0</li>
        <li>loop: boolean, default true</li>
        <li>control: boolean, default true</li>
      </ul>

      <h3>q:slot</h3>

      <ul>
        <li>previous: button to previous</li>
        <li>next: button to next</li>
        <li>thumbnails</li>
        <li>default: list of item</li>
      </ul>

      <hr />

      <h3>Outputs</h3>

      <ul>
        <li></li>
      </ul>
    </>
  );
});
