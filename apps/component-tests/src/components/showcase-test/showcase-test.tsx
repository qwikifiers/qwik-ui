import { Component, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { metaGlobComponents } from './component-imports';

export const ShowcaseTest = component$(() => {
  const location = useLocation();

  const componentPath = `${location.params.kit}/${location.params.component}/examples/${location.params.example}.tsx`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MetaGlobComponentSig = useSignal<Component<any>>();

  useTask$(async () => {
    MetaGlobComponentSig.value =
      await // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (metaGlobComponents[componentPath] as () => Promise<Component<any>>)();
  });

  return (
    <>
      <section class="flex w-full flex-col items-center">
        {MetaGlobComponentSig.value && <MetaGlobComponentSig.value />}
      </section>
    </>
  );
});
