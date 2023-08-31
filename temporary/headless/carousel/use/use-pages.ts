import {
  $,
  type QRL,
  type Signal,
  useVisibleTask$,
  useSignal,
  useOnWindow,
  useComputed$,
} from '@builder.io/qwik';
import { Items } from './use-items';
import { getCount, getElement } from './utils';
// import { Scroll } from './use-scroll';

export type Pages = {
  total: Signal<number>;
  ranges: Signal<number[][]>;
  current: Signal<number>;
  previous: QRL<() => void>;
  next: QRL<() => void>;
  scrollAt: QRL<(index: number) => void>;
};

type Params = {
  items: Items;
  loop?: boolean;
  transition?: number;
};

export const usePages = (ref: Signal<HTMLElement | undefined>, params: Params): Pages => {
  const transition = params.transition || 350;
  const loop = params.loop ?? true;
  const ranges = useSignal<Array<number[]>>([]);
  const total = useComputed$(() => ranges.value.length);
  const current = useComputed$(() =>
    getPageFromActiveItem(params.items.active.current.value, ranges.value),
  );
  const active = params.items.active;

  const computePages = $(() => {
    let acc = 0;
    const element = ref.value?.querySelector('[attr-data-qui="carousel"]');
    const widthMax = ref.value?.getClientRects()[0].width || 1;
    const output: Array<number[]> = [[]];

    Array.from(element?.children || []).forEach((child, i) => {
      const width = child.getClientRects()[0].width;
      const next = element?.children[i + 1]?.getClientRects()[0].x;
      const gap = !next ? 0 : width + child.getClientRects()[0].x - next;

      acc += width + Math.abs(gap);

      if (!output[Math.ceil(acc / widthMax) - 1]) {
        output.push([]);
      }
      output[Math.ceil(acc / widthMax) - 1].push(i);
    });

    ranges.value = output;
  });

  const scrollAt = $((index: number) => {
    const count = getCount(ref);
    const element = getElement(ref, index);

    if (!ref?.value || !count) {
      console.warn(`Can't jump to ${index} because the carousel elements is empty.`);
      return;
    }

    if (!element) {
      console.warn(
        `Can't jump to ${index} because the element index ${index} doesn't exist.`,
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
      transition,
    );

    active.current.value = index;
  });

  const previous = $(() => {
    if (!loop && params.items.active.current.value === 0) {
      return;
    }

    if (params.items.active.current.value === 0) {
      scrollAt(ranges.value.at(current.value - 1)?.[0] || 0);
      return;
    }

    if (current.value === 0) {
      scrollAt(0);
      return;
    }

    scrollAt(ranges.value.at(current.value - 1)?.[0] || 0);
  });

  const next = $(() => {
    if (!loop && current.value + 1 === total.value) {
      return;
    }

    scrollAt(ranges.value.at(current.value + 1)?.[0] || 0);
  });

  useVisibleTask$(() => computePages());
  useOnWindow('resize', computePages);

  return {
    total,
    ranges,
    current,
    next,
    previous,
    scrollAt,
  };
};

export const getPageFromActiveItem = (index: number, ranges: number[][]) => {
  if (index === 0) {
    return 0;
  }
  return ranges.findIndex((range) => range.find((value) => value === index));
};
