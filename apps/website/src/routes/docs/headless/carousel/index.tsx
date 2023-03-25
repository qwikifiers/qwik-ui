import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export const IMAGES: { image: string; thumbnail: string }[] = [
  {
    image: 'https://picsum.photos/200/300',
    thumbnail: 'https://picsum.photos/20/30',
  },
  {
    image: 'https://picsum.photos/200/300',
    thumbnail: 'https://picsum.photos/20/30',
  },
  {
    image: 'https://picsum.photos/200/300',
    thumbnail: 'https://picsum.photos/20/30',
  },
];

export default component$(() => {
  useStylesScoped$(`
   h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
   .form-item, hr { width: 35em; }
   h2 { margin-block: 1.15em 0.5em; font-size: xx-large; }
   h3 { margin-block: 0.85em 0.35em; font-size: x-large; }
  `);

  const images = useSignal(IMAGES);

  return (
    <>
      <p>This is the documentation for the Carousel</p>

      <h2>Carousel Example</h2>

      <Carousel images={images.value} />

      <hr />

      <h3>Inputs</h3>

      <ul>
        <li></li>
      </ul>

      <hr />

      <h3>Outputs</h3>

      <ul>
        <li></li>
      </ul>
    </>
  );
});
