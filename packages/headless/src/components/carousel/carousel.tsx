import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useId,
  useSignal,
  useStyles$,
} from '@builder.io/qwik';
import { useCarousel } from './use-carousel';
import { useOrdinal } from './use-ordinal';
import styles from './carousel.css?inline';

type CarouselProps = QwikIntrinsicElements['div'] & {
  startAt?: number;
  loop?: boolean;
  control?: boolean;
};

export const Carousel = component$(
  ({ startAt = 0, control = true, loop = true }: CarouselProps) => {
    const itemsRef = useSignal<HTMLElement>();
    const {
      active,
      count,
      next,
      previous,
      scrollTo,
      isFirstActive,
      isLastActive,
    } = useCarousel({ itemsRef, startAt, loop });

    const ordinal = useOrdinal();

    useStyles$(styles);

    return (
      <div>
        <ul>
          <li>count: {count.value}</li>
          <li>
            active: {active.value} (initially: {startAt})
          </li>
          <li>first: {isFirstActive.value ? 'true' : 'false'}</li>
          <li>last: {isLastActive.value ? 'true' : 'false'}</li>
        </ul>

        <div role="presentation" class="carousel">
          <button
            aria-label="Got to the previous item"
            class="carousel__previous"
            disabled={isFirstActive.value ?? !loop}
            onClick$={previous}
          >
            <Slot name="previous" />
          </button>

          <div role="list" ref={itemsRef} class="carousel__items">
            <Slot />
          </div>

          <button
            aria-label="Got to the next item"
            class="carousel__next"
            disabled={isLastActive.value ?? !loop}
            onClick$={next}
          >
            <Slot name="next" />
          </button>

          <div class="thumbnails">
            <Slot name="thumbnail" />
          </div>

          {control && (
            <nav class="controls">
              <ul>
                {Array.from({ length: count.value }).map((_, i) => (
                  <li key={useId()}>
                    <button
                      aria-label={`Go to slide number ${i + 1}`}
                      aria-current={active.value === i}
                      onClick$={() => scrollTo(i)}
                    >
                      <span class="sr-only">
                        Go to the {ordinal(i + 1)} item
                      </span>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    );
  }
);

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
