import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';

import {
  Carousel,
  CarouselNext,
  CarouselPrev,
  CarouselSlide,
  CarouselView,
  CarouselContainer,
  CarouselPagination,
} from '@qwik-ui/headless';
import carouselStyles from './carousel.css?inline';

export default component$(() => {
  /* TODO: document this to always have initial state to null.
  Use defaultSlide instead for setting a slide on page load */
  const currentIndexSig = useSignal<number>(0);
  useStyles$(carouselStyles);

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

  return (
    <Carousel
      bind:currSlideIndex={currentIndexSig}
      spaceBetweenSlides={30}
      class="carousel"
    >
      <div class="carousel-buttons">
        <Carousel.Prev class="prev-button">Prev</Carousel.Prev>
        <Carousel.Next class="next-button">Next</Carousel.Next>
      </div>
      <Carousel.View>
        <Carousel.Container class="carousel-container">
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
        </Carousel.Container>
      </Carousel.View>
      <div>
        <Carousel.Pagination
          class="carousel-pagination"
          renderBullet$={$((i: number) => {
            return (
              <div
                class={`carousel-pagination-bullet ${
                  currentIndexSig.value === i ? 'pagination-underline' : ''
                }`}
                onClick$={() => (currentIndexSig.value = i)}
              >
                {i}
              </div>
            );
          })}
        />
      </div>
    </Carousel>
  );
});
