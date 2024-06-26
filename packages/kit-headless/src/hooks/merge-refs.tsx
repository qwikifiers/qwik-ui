import { Signal, useSignal, useTask$ } from '@builder.io/qwik';

/* This hook merges a given ref with an internal ref. It allows consumers to pass a ref to the component and have it merged with the internal ref. */

// 'any' used as ref types are not signals and internal type is hidden.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMergedRef(givenRef: any, contextRef?: Signal<any>) {
  const internalRef = useSignal<HTMLElement>();

  useTask$(() => {
    if (givenRef) {
      if (contextRef) {
        contextRef.value = givenRef.value;
      } else {
        internalRef.value = givenRef.value;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return contextRef ? contextRef : (internalRef as Signal<any>);
}
