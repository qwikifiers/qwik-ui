import { Signal, useSignal, useTask$, $, useComputed$ } from '@builder.io/qwik';

/* This hook merges a consumer passed ref with our internal ref. It allows consumers to pass a reference to the component and get access to the underlying element. */

type CtxOpts = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context?: any;
  givenContextRef?: Signal;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCombinedRef(externalRef: any, ctxOpts?: CtxOpts) {
  // we create a ref in case the consumer does not pass a ref
  const internalRef = useSignal<HTMLElement>();

  /** Grab the key name so it updates context Ex: context.triggerRef => triggerRef */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getContextKey = $((context: any, ref: Signal): string | undefined => {
    for (const key in context) {
      if (context[key] === ref) {
        return key;
      }
    }
    return undefined;
  });

  // we get the ref from the context if it exists
  const ctxRefNameSig = useComputed$(async () => {
    if (!ctxOpts?.context) return;

    return (
      ctxOpts?.givenContextRef &&
      (await getContextKey(ctxOpts.context, ctxOpts.givenContextRef))
    );
  });
  const contextRefExists = ctxRefNameSig.value !== undefined;
  const contextRef = contextRefExists && ctxOpts?.context?.[ctxRefNameSig.value!];

  useTask$(() => {
    if (!externalRef) return;

    if (contextRef) {
      // update the context with the external ref
      ctxOpts.context[ctxRefNameSig.value!] = externalRef;
    } else {
      internalRef.value = externalRef.value;
    }
  });

  const mergedRef = contextRef ? contextRef : internalRef;

  if (!mergedRef) {
    throw new Error(
      'Qwik UI: useCombinedRef could not find the ref. Please pass a ref to the component.',
    );
  }

  return mergedRef as Signal;
}
