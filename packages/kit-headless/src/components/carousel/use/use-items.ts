import {
  useOnDocument,
  type Signal,
  type QRL,
  $,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { getCount, getElement, getElements } from './utils';
import { Visible, useVisible } from './use-visible';

type Params = {
  startAt?: number;
  transition?: number;
  loop?: boolean;
};

type Active = {
  current: Signal<number>;
  isFirst: Signal<boolean>;
  isLast: Signal<boolean>;
};

export type Items = {
  active: Active;
  visible: Visible;
  total: Signal<number>;
  scrollAt: QRL<(index: number) => void>;
  previous: QRL<() => void>;
  next: QRL<() => void>;
};

export const useItems = (
  ref: Signal<HTMLElement | undefined>,
  params: Params | void,
): Items => {
  const visible = useVisible(ref);

  const loop = params?.loop ?? true;
  const transition = params?.transition || 350;
  const isFirst = (params?.startAt && params?.startAt === 0) || false;
  const isLast = (params?.startAt && params?.startAt + 1 === getCount(ref)) || false;
  const index = params?.startAt || 0;

  const total = useSignal(0);
  const active = useStore({
    isFirst: useSignal(isFirst),
    isLast: useSignal(isLast),
    current: useSignal(index),
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
    if (!loop && active.isFirst.value) {
      return;
    }
    const index = active.isFirst.value ? getCount(ref) - 1 : active.current.value - 1;
    scrollAt(index);
  });

  const next = $(() => {
    const max = getCount(ref) - 1;
    if (!loop && active.current.value === max) {
      return;
    }
    const index = active.current.value === max ? 0 : active.current.value + 1;
    scrollAt(index);
  });

  useOnDocument(
    'focus',
    $(() => {
      getElements(ref).forEach((element, index) => {
        if (!element.contains(document.activeElement)) {
          return;
        }
        active.current.value = index;
      });
    }),
  );

  useTask$(({ track }) => {
    const index = track(() => active.current.value);
    active.isFirst.value = index === 0;
    active.isLast.value = index + 1 === getCount(ref);
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    total.value = getCount(ref);
    scrollAt(active.current.value);
  });

  return {
    active,
    visible,
    total,
    next,
    previous,
    scrollAt,
  };
};
