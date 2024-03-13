import { Component, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { isDev } from '@builder.io/qwik/build';
import { metaGlobComponents } from '../showcase/component-imports';

export const ShowcaseTest = component$(() => {
  const location = useLocation();

  const prevFolder = location.url.pathname.split('/').slice(0, -2).join('/') + '/';

  const componentPath = `/src/routes${prevFolder}examples/${location.params.example}.tsx`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MetaGlobComponentSig = useSignal<Component<any>>();

  useTask$(async () => {
    MetaGlobComponentSig.value = isDev
      ? await metaGlobComponents[componentPath]() // We need to call `await metaGlobComponents[componentPath]()` in development as it is `eager:false`
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
