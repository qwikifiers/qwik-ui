import {
  useOnDocument,
  type Signal,
  type QRL,
  $,
  useSignal,
  useStore,
  useTask$,
} from '@builder.io/qwik';
import { getCount, getElements } from './utils';

type Params = {
  startAt?: number;
  onScroll?: (fn$: QRL<(event: Event) => void>) => void;
};

export type Active = {
  index: Signal<number>;
  isFirst: Signal<boolean>;
  isLast: Signal<boolean>;
};

export const useActive = (
  ref: Signal<HTMLElement | undefined>,
  params: Params | void
) => {
  const isFirst = (params?.startAt && params?.startAt === 0) || false;
  const isLast =
    (params?.startAt && params?.startAt + 1 === getCount(ref)) || false;
  const index = params?.startAt || 0;

  const active = useStore({
    isFirst: useSignal(isFirst),
    isLast: useSignal(isLast),
    index: useSignal(index),
  });

  useOnDocument(
    'focus',
    $(() => {
      getElements(ref).forEach((element, index) => {
        if (!element.contains(document.activeElement)) {
          return;
        }
        active.index.value = index;
      });
    })
  );

  useTask$(({ track }) => {
    const index = track(() => active.index.value);
    active.isFirst.value = index === 0;
    active.isLast.value = index + 1 === getCount(ref);
  });

  return active;
};
