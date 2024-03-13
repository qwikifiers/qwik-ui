import { Component, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { isDev } from '@builder.io/qwik/build';
import { metaGlobComponents } from './component-imports';

export const ShowcaseTest = component$(() => {
  const location = useLocation();

  const componentPath = `${location.params.kit}/${location.params.component}/examples/${location.params.example}.tsx`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MetaGlobComponentSig = useSignal<Component<any>>();

  useTask$(async () => {
    // eslint-disable-next-line qwik/valid-lexical-scope
    MetaGlobComponentSig.value = isDev
      ? // @ts-ignore
        await metaGlobComponents[componentPath]() // We need to call `await metaGlobComponents[componentPath]()` in development as it is `eager:false`
      : metaGlobComponents[componentPath]; // We need to directly access the `metaGlobComponents[componentPath]` expression in preview/production as it is `eager:true`
  });

  return (
    <>
      <section class="flex flex-col items-center">
        {MetaGlobComponentSig.value && <MetaGlobComponentSig.value />}
      </section>
    </>
  );
});
