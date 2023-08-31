import { useVisibleTask$, type Signal, useSignal, $ } from '@builder.io/qwik';
import { getContainer, getElements } from './utils';

export type Visible = {
  first: Signal<number>;
  last: Signal<number>;
};

export const useVisible = (ref: Signal<HTMLElement | undefined>) => {
  const first = useSignal<number>(0);
  const last = useSignal<number>(0);

  const trackVisible = $(async (map: Map<Element, boolean | undefined>) => {
    const items = Array.from(map);
    let start = 0;
    let end = 0;

    items.forEach(([, visible], i) => {
      if (i === 0 && visible) {
        start = 0;
      }

      const next = items.at(i + 1)?.[1];
      if (!visible && next) {
        start = i + 1;
      }

      if (visible && !next) {
        end = i;
      }
    });

    return { start, end };
  });

  useVisibleTask$(async function trackActiveItems() {
    const map = new Map<Element, boolean | undefined>();
    getElements(ref).forEach((element) => map.set(element, undefined));

    const observer = new IntersectionObserver(
      (nodes) => {
        nodes.forEach(async (item) => {
          map.set(item.target, item.isIntersecting);
          const { start, end } = await trackVisible(map);
          first.value = start;
          last.value = end;
        });
      },
      { root: getContainer(ref) },
    );

    getElements(ref).forEach((item) => observer.observe(item));
  });

  return { first, last };
};
