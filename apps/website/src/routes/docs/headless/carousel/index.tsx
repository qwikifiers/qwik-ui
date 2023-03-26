import {
  component$,
  useId,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { Carousel, IconNext, IconPrevious } from '@qwik-ui/headless';

export const IMAGES: { image: string; thumbnail: string }[] = Array.from({
  length: 4,
}).map(() => ({
  image: 'https://picsum.photos/1200/550',
  thumbnail: 'https://picsum.photos/20/30',
}));

export default component$(() => {
  useStylesScoped$(`
   h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
   .form-item, hr { width: 35em; }
   h2 { margin-block: 1.15em 0.5em; font-size: xx-large; }
   h3 { margin-block: 0.85em 0.35em; font-size: x-large; }
   hr { margin-block: 2em; }
  `);

  const images = useSignal(IMAGES);

  return (
    <>
      <p>This is the documentation for the Carousel</p>

      <h2>Carousel Example</h2>

      <Carousel startAt={1} loop={true} control={true}>
        {images.value.map((image) => (
          <img
            role="listitem"
            key={useId()}
            src={image.image}
            style="max-height: 500px; height: 100%;"
          />
        ))}
        <span q:slot="previous">
          <IconPrevious />
        </span>
        <span q:slot="next">
          <IconNext />
        </span>
      </Carousel>

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
