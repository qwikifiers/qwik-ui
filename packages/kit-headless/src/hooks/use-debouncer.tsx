import { QRL, useSignal, $ } from '@builder.io/qwik';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebouncer = (fn: QRL<(args: any) => void>, delay: number) => {
  const timeoutId = useSignal<number>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return $((args?: any) => {
    clearTimeout(timeoutId.value);
    timeoutId.value = Number(setTimeout(() => fn(args), delay));
  });
};
