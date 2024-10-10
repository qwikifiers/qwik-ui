export const api = {
  carousel: [
    {
      bullet: [],
    },
    {
      inline: [],
    },
    {
      next: [],
    },
    {
      pagination: [],
    },
    {
      player: [],
    },
    {
      previous: [],
    },
    {
      root: [
        {
          CarouselRootProps: [
            {
              comment: 'The gap between slides',
              prop: 'gap?',
              type: 'number',
            },
            {
              comment: 'Number of slides to show at once',
              prop: 'slidesPerView?',
              type: 'number',
            },
            {
              comment: 'Whether the carousel is draggable',
              prop: 'draggable?',
              type: 'boolean',
            },
            {
              comment: 'Alignment of slides within the viewport',
              prop: 'align?',
              type: "'start' | 'center' | 'end'",
            },
            {
              comment: 'Whether the carousel should rewind',
              prop: 'rewind?',
              type: 'boolean',
            },
            {
              comment: 'Bind the selected index to a signal',
              prop: "'bind:selectedIndex'?",
              type: 'Signal<number>',
            },
            {
              comment: 'change the initial index of the carousel on render',
              prop: 'startIndex?',
              type: 'number',
            },
            {
              comment:
                '@deprecated Use bind:selectedIndex instead\n   Bind the current slide index to a signal',
              prop: "'bind:currSlideIndex'?",
              type: 'Signal<number>',
            },
            {
              comment: 'Whether the carousel should autoplay',
              prop: "'bind:autoplay'?",
              type: 'Signal<boolean>',
            },
            {
              comment: 'the current progress of the carousel',
              prop: "'bind:progress'?",
              type: 'Signal<number>',
            },
            {
              comment: 'Time in milliseconds before the next slide plays during autoplay',
              prop: 'autoPlayIntervalMs?',
              type: 'number',
            },
            {
              comment: '@internal Total number of slides',
              prop: '_numSlides?',
              type: 'number',
            },
            {
              comment: '@internal Whether this carousel has a title',
              prop: '_isTitle?',
              type: 'boolean',
            },
            {
              comment: 'The sensitivity of the carousel dragging',
              prop: 'sensitivity?',
              type: '{',
            },
          ],
        },
      ],
    },
    {
      scroller: [],
    },
    {
      slide: [],
    },
    {
      step: [],
    },
    {
      stepper: [],
    },
    {
      title: [],
    },
    {
      'use-carousel': [],
    },
    {
      'use-scroller': [],
    },
  ],
};
