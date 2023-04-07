import { useOnDocument, type Signal, $ } from '@builder.io/qwik';
import { getCount, getElements } from './utils';

type Params = {
  active: Signal<number>;
};

export const useActive = (
  ref: Signal<HTMLElement | undefined>,
  { active }: Params
) => {
  useActiveOnFocus(ref, { active });

  return {
    isFirst: active.value === 0,
    isLast: active.value + 1 === getCount(ref),
  };
};

const useActiveOnFocus = (
  ref: Signal<HTMLElement | undefined>,
  { active }: { active: Signal<number> }
) => {
  useOnDocument(
    'focus',
    $(() => {
      getElements(ref).forEach((element, index) => {
        if (!element.contains(document.activeElement)) {
          return;
        }
        active.value = index;
      });
    })
  );
};
