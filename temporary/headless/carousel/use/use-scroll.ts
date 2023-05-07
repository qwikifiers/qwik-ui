import { $, type Signal, type QRL, useVisibleTask$ } from '@builder.io/qwik';
import { getCount, getElement } from './utils';
import { Items } from './use-items';

type Params = {
  items: Items;
  loop?: boolean;
  transition?: number;
};

export type Scroll = {
  next: QRL<() => void>;
  previous: QRL<() => void>;
  to: QRL<(index: number) => void>;
};

export const useScroll = (
  ref: Signal<HTMLElement | undefined>,
  { items, loop = true, transition = 350 }: Params
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

    setTimeout(
      () =>
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        }),
      transition
    );

    items.active.current.value = index;
  });

  const previous = $(() => {
    if (!loop && items.active.isFirst.value) {
      return;
    }
    const index = items.active.isFirst.value
      ? getCount(ref) - 1
      : items.active.current.value - 1;
    to(index);
  });

  const next = $(() => {
    const max = getCount(ref) - 1;
    if (!loop && items.active.current.value === max) {
      return;
    }
    const index =
      items.active.current.value === max ? 0 : items.active.current.value + 1;
    to(index);
  });

  useVisibleTask$(() => {
    to(items.active.current.value);
  });

  return {
    to,
    previous,
    next,
  };
};
