import {
  component$,
  createContextId,
  QwikIntrinsicElements,
  type Signal,
  Slot,
  useContext,
  useContextProvider,
  useStylesScoped$,
  QRL,
  useId,
  $,
} from '@builder.io/qwik';
import { useOrdinal } from '@qwik-ui/shared';

import stylesButtons from './styles-buttons.css?inline';
import stylesControl from './styles-control.css?inline';
import stylesItem from './styles-item.css?inline';
import stylesItems from './styles-items.css?inline';

export type CarouselContext = {
  ref: Signal<HTMLElement | undefined>;
  id: string;
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
  use: CarouselContext;
};

export const Root = component$(({ use, ...props }: RootProps) => {
  useContextProvider(carouselContext, use);

  return (
    <>
      <div id={use.id} ref={use.ref} {...props}>
        <Slot />
      </div>
    </>
  );
});

type ButtonProps = QwikIntrinsicElements['button'];

export const ButtonNext = component$(({ onClick$, ...props }: ButtonProps) => {
  useStylesScoped$(stylesButtons);
  const { isLastActive, loop, next } = useContext(carouselContext);
  return (
    <button
      aria-label="Got to the next item"
      disabled={!loop ? isLastActive.value : false}
      {...props}
      onClick$={[$(() => next()), onClick$]}
    >
      <Slot />
    </button>
  );
});

export const ButtonPrevious = component$(
  ({ onClick$, ...props }: ButtonProps) => {
    useStylesScoped$(stylesButtons);
    const { isFirstActive, loop, previous } = useContext(carouselContext);
    return (
      <button
        aria-label="Got to the previous item"
        disabled={!loop ? isFirstActive.value : false}
        {...props}
        onClick$={[$(() => previous()), onClick$]}
      >
        <Slot />
      </button>
    );
  }
);

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

type ItemProps = QwikIntrinsicElements['li'] & {
  label: string;
  index: number;
};

export const Item = component$(
  ({ index, label, ...props }: Omit<ItemProps, 'class'>) => {
    useStylesScoped$(stylesItem);
    const { id, active } = useContext(carouselContext);
    return (
      <li {...props} aria-current={active.value === index}>
        <input
          aria-label={label}
          type="radio"
          checked={active.value === index}
          name={`item-${id}`}
        />
        <Slot />
      </li>
    );
  }
);

type ControlContext = {
  id: string;
};

type ControlsProps = QwikIntrinsicElements['div'];

export const controlContext = createContextId<ControlContext>(
  'carousel-control-root'
);

export const Controls = component$((props: ControlsProps) => {
  const controlService = { id: props.id || useId() };
  useContextProvider(controlContext, controlService);
  return (
    <nav {...props}>
      <Slot />
    </nav>
  );
});

type ControlProps = QwikIntrinsicElements['div'] & {
  index: number;
};

export const Control = component$(
  ({ index, onClick$, ...props }: ControlProps) => {
    useStylesScoped$(stylesControl);
    const ordinal = useOrdinal();
    const { active, scrollTo } = useContext(carouselContext);
    const { id } = useContext(controlContext);

    return (
      <div
        aria-current={active.value === index}
        {...props}
        onClick$={[$(() => scrollTo(index)), onClick$]}
      >
        <input
          aria-label={`Go to the ${ordinal?.(index + 1)} item`}
          type="radio"
          checked={active.value === index}
          name={`control-${id}`}
          onChange$={() => scrollTo(index)}
        />
        <Slot />
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
