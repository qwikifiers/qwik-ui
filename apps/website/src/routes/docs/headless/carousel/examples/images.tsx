import { component$, useStyles$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  return (
    <Carousel.Root class="carousel-root">
      <div class="carousel-buttons">
        <Carousel.Previous class="prev-button">Prev</Carousel.Previous>
        <Carousel.Next class="next-button">Next</Carousel.Next>
      </div>
      <Carousel.Scroller class="carousel-container">
        {slideImageMetadata.map((data) => (
          <Carousel.Slide key={data.id} class="carousel-slide">
            <img
              class="carousel-img"
              width="640"
              height="320"
              src={`https://picsum.photos/id/${data.id}/640/320`}
              alt={data.author}
            />
          </Carousel.Slide>
        ))}
      </Carousel.Scroller>
    </Carousel.Root>
  );
});

const slideImageMetadata = [
  {
    id: '10',
    author: 'Paul Jarvis',
    width: 2500,
    height: 1667,
    url: 'https://unsplash.com/photos/6J--NXulQCs',
    download_url: 'https://picsum.photos/id/10/2500/1667',
  },
  {
    id: '11',
    author: 'Paul Jarvis',
    width: 2500,
    height: 1667,
    url: 'https://unsplash.com/photos/Cm7oKel-X2Q',
    download_url: 'https://picsum.photos/id/11/2500/1667',
  },
  {
    id: '12',
    author: 'Paul Jarvis',
    width: 2500,
    height: 1667,
    url: 'https://unsplash.com/photos/I_9ILwtsl_k',
    download_url: 'https://picsum.photos/id/12/2500/1667',
  },
  {
    id: '13',
    author: 'Paul Jarvis',
    width: 2500,
    height: 1667,
    url: 'https://unsplash.com/photos/3MtiSMdnoCo',
    download_url: 'https://picsum.photos/id/13/2500/1667',
  },
  {
    id: '14',
    author: 'Paul Jarvis',
    width: 2500,
    height: 1667,
    url: 'https://unsplash.com/photos/IQ1kOQTJrOQ',
    download_url: 'https://picsum.photos/id/14/2500/1667',
  },
  {
    id: '15',
    author: 'Paul Jarvis',
    width: 2500,
    height: 1667,
    url: 'https://unsplash.com/photos/NYDo21ssGao',
    download_url: 'https://picsum.photos/id/15/2500/1667',
  },
  {
    id: '16',
    author: 'Paul Jarvis',
    width: 2500,
    height: 1667,
    url: 'https://unsplash.com/photos/gkT4FfgHO5o',
    download_url: 'https://picsum.photos/id/16/2500/1667',
  },
  {
    id: '17',
    author: 'Paul Jarvis',
    width: 2500,
    height: 1667,
    url: 'https://unsplash.com/photos/Ven2CV8IJ5A',
    download_url: 'https://picsum.photos/id/17/2500/1667',
  },
  {
    id: '18',
    author: 'Paul Jarvis',
    width: 2500,
    height: 1667,
    url: 'https://unsplash.com/photos/Ps2n0rShqaM',
    download_url: 'https://picsum.photos/id/18/2500/1667',
  },
  {
    id: '19',
    author: 'Paul Jarvis',
    width: 2500,
    height: 1667,
    url: 'https://unsplash.com/photos/P7Lh0usGcuk',
    download_url: 'https://picsum.photos/id/19/2500/1667',
  },
];

// internal
import styles from './carousel.css?inline';
