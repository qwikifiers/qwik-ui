import { $, type Signal, type QRL, useVisibleTask$ } from '@builder.io/qwik';
import { getCount, getElement } from './utils';

type Params = {
  active: {
    isFirst: Signal<boolean>;
    isLast: Signal<boolean>;
    index: Signal<number>;
  };
  loop?: boolean;
};

export type Scroll = {
  next: QRL<() => void>;
  previous: QRL<() => void>;
  to: QRL<(index: number) => void>;
};

export const useScroll = (
  ref: Signal<HTMLElement | undefined>,
  { active, loop = true }: Params
) => {
  const to = $((index: number) => {
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

    active.index.value = index;
  });

  const previous = $(() => {
    if (!loop && active.isFirst.value) {
      return;
    }
    const index = active.isFirst.value
      ? getCount(ref) - 1
      : active.index.value - 1;
    to(index);
  });

  const next = $(() => {
    const max = getCount(ref) - 1;
    if (!loop && active.index.value === max) {
      return;
    }
    const index = active.index.value === max ? 0 : active.index.value + 1;
    to(index);
  });

  useVisibleTask$(() => {
    to(active.index.value);
  });

  return {
    to,
    previous,
    next,
  };
};
