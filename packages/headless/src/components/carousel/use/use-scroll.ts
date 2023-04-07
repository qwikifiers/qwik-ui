import {
  $,
  type Signal,
  QRL,
  useTask$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { getCount, getElement } from './utils';
import { isBrowser } from '@builder.io/qwik/build';
import { useActive } from './use-active';

export type ScrollToEvent = CustomEvent<{
  element: Element;
  index: number;
}>;

type Options = {
  active: Signal<number>;
  loop: boolean;
};

export const useScroll = (
  ref: Signal<HTMLElement | undefined>,
  options: Options
) => {
  const { active, loop } = options || {};
  const { isFirst } = useActive(ref, { active });
  const scrolled = useSignal<Element>();

  const scrollTo = $((index: number) => {
    const count = getCount(ref);
    const element = getElement(ref, index);

    if (!ref?.value || !count) {
      console.warn(
        `Can't jump to ${index} because the carousel elements is empty.`
      );
      return;
    }

    if (!element) {
      console.warn(
        `Can't jump to ${index} because the element index ${index} doesn't exist.`
      );
      return;
    }

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });

    scrolled.value = element;
    ref.value.dispatchEvent(
      new CustomEvent('scrolledTo', { detail: { element, index } })
    );
  });

  const onScroll = (fn$: QRL<(event: Event) => void>) => {
    useTask$(({ track }) => {
      track(() => scrolled.value);

      if (!isBrowser) {
        return;
      }

      ref.value?.addEventListener('scrolledTo', fn$);

      return () => ref.value?.removeEventListener('scrolledTo', fn$);
    });
  };

  const previous = $(() => {
    if (!options?.loop && isFirst) {
      return;
    }
    const index = active.value === 0 ? getCount(ref) - 1 : active.value - 1;
    scrollTo(index);
  });

  const next = $(() => {
    const max = getCount(ref) - 1;
    if (!loop && getCount(ref) === max) {
      return;
    }
    const index = active.value === max ? 0 : active.value + 1;
    scrollTo(index);
  });

  useVisibleTask$(() => {
    scrollTo(active.value);
  });

  return {
    scrollTo,
    onScroll,
    previous,
    next,
  };
};
