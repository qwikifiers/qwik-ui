import {
  component$,
  createContextId,
  QwikIntrinsicElements,
  type Signal,
  Slot,
  useContext,
  useContextProvider,
  useId,
  useSignal,
  useStylesScoped$,
  QRL,
} from '@builder.io/qwik';
import { useCarousel } from './use-carousel';
import { useOrdinal } from './use-ordinal';

import stylesControls from './styles-controls.css?inline';
import stylesItem from './styles-item.css?inline';
import stylesItems from './styles-items.css?inline';

export type CarouselContext = {
  loop: boolean;
  startAt: number;
  active: Signal<number>;
  count: Signal<number>;
  next: QRL<() => void>;
  previous: QRL<() => void>;
  scrollTo: QRL<(index: number) => void>;
  isFirstActive: Signal<boolean>;
  isLastActive: Signal<boolean>;
};

export const carouselContext =
  createContextId<CarouselContext>('carousel-root');

type RootProps = QwikIntrinsicElements['div'] & {
  startAt?: number;
  loop?: boolean;
  control?: boolean;
};

export const Root = component$(
  ({ startAt = 0, loop = true, ...props }: RootProps) => {
    const itemsRef = useSignal<HTMLElement>();
    const contextService: CarouselContext = useCarousel({
      itemsRef,
      startAt,
      loop,
    });
    useContextProvider(carouselContext, contextService);

    return (
      <>
        <ul>
          <li>count: {contextService.count.value}</li>
          <li>active: {contextService.active.value + 1}</li>
          <li>
            first: {contextService.isFirstActive.value ? 'true' : 'false'}
          </li>
          <li>last: {contextService.isLastActive.value ? 'true' : 'false'}</li>
          <li>loop: {contextService.loop ? 'true' : 'false'}</li>
        </ul>
        <div ref={itemsRef} {...props}>
          <Slot />
        </div>
      </>
    );
  }
);

export const ButtonNext = component$(() => {
  const { isLastActive, loop, next } = useContext(carouselContext);
  return (
    <button
      aria-label="Got to the next item"
      class="carousel__next"
      disabled={!loop ? isLastActive.value : false}
      onClick$={next}
    >
      <Slot />
    </button>
  );
});

export const ButtonPrevious = component$(() => {
  const { isFirstActive, loop, previous } = useContext(carouselContext);
  return (
    <button
      aria-label="Got to the previous item"
      class="carousel__prev"
      disabled={!loop ? isFirstActive.value : false}
      onClick$={previous}
    >
      <Slot />
    </button>
  );
});

export const Items = component$(() => {
  useStylesScoped$(stylesItems);
  return (
    <div class="carousel">
      <ul class="carousel__items">
        <Slot />
      </ul>
    </div>
  );
});

export const Item = component$(() => {
  useStylesScoped$(stylesItem);
  return (
    <li>
      <Slot />
    </li>
  );
});

type ControlsProps = QwikIntrinsicElements['div'];

export const Controls = component$((props: ControlsProps) => {
  useStylesScoped$(stylesControls);
  const ordinal = useOrdinal();
  const { count, active, scrollTo } = useContext(carouselContext);

  return (
    <nav {...props}>
      <ul>
        {Array.from({ length: count.value }).map((_, i) => (
          <li key={useId()}>
            <button
              aria-label={`Go to slide number ${i + 1}`}
              aria-current={active.value === i}
              onClick$={() => scrollTo(i)}
            >
              <span class="sr-only">Go to the {ordinal(i + 1)} item</span>
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export const IconPrevious = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

export const IconNext = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);
