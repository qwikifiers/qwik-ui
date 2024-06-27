import { Signal, useSignal, useTask$ } from '@builder.io/qwik';

/* This hook merges a given ref with an internal ref. It allows consumers to pass a ref to the component and have it merged with the internal ref. */

// 'any' used as ref types are not signals and internal type is hidden.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMergedRef<T extends Record<string, any>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  givenRef: any,
  context?: T,
  contextRefName?: keyof T,
) {
  const internalRef = useSignal<HTMLElement>();

  useTask$(() => {
    if (givenRef) {
      if (context && contextRefName) {
        if (!context[contextRefName]) {
          throw new Error(
            'Qwik UI: useMergedRef could not find the context key of the ref it needed to merge and update context.',
          );
        }

        context[contextRefName] = givenRef;
      } else {
        internalRef.value = givenRef.value;
      }
    }
  });

  return context && contextRefName && context[contextRefName as keyof T]
    ? (context[contextRefName as keyof T] as Signal)
    : (internalRef as Signal);
}
