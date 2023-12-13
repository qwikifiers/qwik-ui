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

export default component$(() => {
  /* TODO: document this to always have initial state to null.
  Use defaultSlide instead for setting a slide on page load */
  const currentIndexSig = useSignal<number>(0);

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
    // {
    //   id: '20',
    //   author: 'Aleks Dorohovich',
    //   width: 3670,
    //   height: 2462,
    //   url: 'https://unsplash.com/photos/nJdwUHmaY8A',
    //   download_url: 'https://picsum.photos/id/20/3670/2462',
    // },
    // {
    //   id: '21',
    //   author: 'Alejandro Escamilla',
    //   width: 3008,
    //   height: 2008,
    //   url: 'https://unsplash.com/photos/jVb0mSn0LbE',
    //   download_url: 'https://picsum.photos/id/21/3008/2008',
    // },
    // {
    //   id: '22',
    //   author: 'Alejandro Escamilla',
    //   width: 4434,
    //   height: 3729,
    //   url: 'https://unsplash.com/photos/du_OrQAA4r0',
    //   download_url: 'https://picsum.photos/id/22/4434/3729',
    // },
    // {
    //   id: '23',
    //   author: 'Alejandro Escamilla',
    //   width: 3887,
    //   height: 4899,
    //   url: 'https://unsplash.com/photos/8yqds_91OLw',
    //   download_url: 'https://picsum.photos/id/23/3887/4899',
    // },
    // {
    //   id: '24',
    //   author: 'Alejandro Escamilla',
    //   width: 4855,
    //   height: 1803,
    //   url: 'https://unsplash.com/photos/cZhUxIQjILg',
    //   download_url: 'https://picsum.photos/id/24/4855/1803',
    // },
    // {
    //   id: '25',
    //   author: 'Alejandro Escamilla',
    //   width: 5000,
    //   height: 3333,
    //   url: 'https://unsplash.com/photos/Iuq0EL4EINY',
    //   download_url: 'https://picsum.photos/id/25/5000/3333',
    // },
    // {
    //   id: '26',
    //   author: 'Vadim Sherbakov',
    //   width: 4209,
    //   height: 2769,
    //   url: 'https://unsplash.com/photos/tCICLJ5ktBE',
    //   download_url: 'https://picsum.photos/id/26/4209/2769',
    // },
    // {
    //   id: '27',
    //   author: 'Yoni Kaplan-Nadel',
    //   width: 3264,
    //   height: 1836,
    //   url: 'https://unsplash.com/photos/iJnZwLBOB1I',
    //   download_url: 'https://picsum.photos/id/27/3264/1836',
    // },
    // {
    //   id: '28',
    //   author: 'Jerry Adney',
    //   width: 4928,
    //   height: 3264,
    //   url: 'https://unsplash.com/photos/_WiFMBRT7Aw',
    //   download_url: 'https://picsum.photos/id/28/4928/3264',
    // },
    // {
    //   id: '29',
    //   author: 'Go Wild',
    //   width: 4000,
    //   height: 2670,
    //   url: 'https://unsplash.com/photos/V0yAek6BgGk',
    //   download_url: 'https://picsum.photos/id/29/4000/2670',
    // },
  ];

  useStyles$(`
    .qwikui-carousel {
      --slide-size: 100%;
      --slide-height: 5rem;
      aspect-ratio: 2 / 1;
    }

    .qwikui-container {
      backface-visibility: hidden;
      display: flex;
      touch-action: pan-y;
      margin-left: calc(var(--slide-spacing) * -1);
      transition-property: transform;
      transition-timing-function: ease;
    }

    .qwikui-slide {
      flex: 0 0 var(--slide-size);
      min-width: 0;
      position: relative;
      /* padding-top: 16px;
      padding-bottom: 16px; */
      user-select: none;
      transition-property: transform;

      aspect-ratio: 2 / 1;
    }

    qwikui-slide:nth-child(even) {
      background-color: orange !important;
    }

    .next-button[aria-disabled="true"], .prev-button[aria-disabled="true"] {
      background: rgba(51, 65, 85, .35);
    }
  `);

  const bulletLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  return (
    <>
      <Carousel
        bind:currSlideIndex={currentIndexSig}
        spaceBetweenSlides={30}
        class="qwikui-carousel"
      >
        <div class="flex gap-4">
          <CarouselPrev class="prev-button bg-slate-700 px-3 py-2">Prev</CarouselPrev>
          <CarouselNext class="next-button bg-slate-700 px-3 py-2">Next</CarouselNext>
        </div>
        <CarouselView class="bg-slate-500">
          <CarouselContainer class="qwikui-container">
            {slideImageMetadata.map((data, index) => (
              <CarouselSlide key={data.id} class="qwikui-slide bg-yellow-600">
                {index}
                {/* <img
                  draggable={false}
                  class="select-none"
                  width="640"
                  height="320"
                  src={`https://picsum.photos/id/${data.id}/640/320`}
                  alt={data.author}
                /> */}
              </CarouselSlide>
            ))}
          </CarouselContainer>
        </CarouselView>
        <div>
          <CarouselPagination
            renderBullet$={$((i: number) => {
              return (
                <div
                  class={`cursor-pointer ${
                    currentIndexSig.value === i ? 'underline' : ''
                  }`}
                  onClick$={() => (currentIndexSig.value = i)}
                >
                  {i < bulletLetters.length ? bulletLetters[i] : i + 1}
                </div>
              );
            })}
            class="flex gap-1 bg-slate-700 p-2 data-[current-slide]:bg-slate-800"
          />
        </div>
      </Carousel>
      <button
        onClick$={() => {
          currentIndexSig.value = 4;
        }}
      >
        Move to 5
      </button>
    </>
  );
});
