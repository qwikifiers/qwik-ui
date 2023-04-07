import {
  $,
  type Signal,
  useVisibleTask$,
  useSignal,
  useOnWindow,
} from '@builder.io/qwik';

export const usePages = (ref: Signal<HTMLElement | undefined>) => {
  const pages = useSignal<Array<number[]>>([]);

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

    pages.value = output;
  });

  useVisibleTask$(() => computePages());
  useOnWindow('resize', computePages);

  return pages;
};
