import { useSignal, useTask$, type Signal } from '@builder.io/qwik';

/**
 * Creates a bound signal that synchronizes with an external signal if provided.
 * This hook is useful for two-way binding scenarios, especially when dealing with
 * component props that may or may not be signals.
 *
 * @param givenSignal - An optional external signal to bind to.
 * @param initialValue - The initial value to use if no external signal is provided.
 * @returns A signal that is either bound to the external signal or a new internal signal.
 *
 * The returned signal will update the external signal (if provided) whenever its value changes,
 * and will also update itself when the external signal changes.
 */
export function useBoundSignal<T>(givenSignal?: Signal<T>, initialValue?: T): Signal<T> {
  const internalSignal = useSignal<T>(givenSignal?.value ?? (initialValue as T));
  const boundSignal = givenSignal ?? internalSignal;

  useTask$(({ track }) => {
    const value = track(() => boundSignal.value);
    if (givenSignal && givenSignal !== boundSignal) {
      givenSignal.value = value;
    }
    if (boundSignal !== internalSignal) {
      internalSignal.value = value;
    }
  });

  return boundSignal;
}
