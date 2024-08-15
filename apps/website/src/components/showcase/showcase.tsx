import { Component, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Carousel } from '@qwik-ui/headless';
import { Highlight } from '../highlight/highlight';
import { metaGlobComponents, rawComponents } from './component-imports';

type ShowcaseProps = {
  name?: string;
  vertical?: boolean;
};

export const Showcase = component$<ShowcaseProps>(({ name, ...props }) => {
  const location = useLocation();
  const componentPath = `/src/routes${location.url.pathname}examples/${name}.tsx`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MetaGlobComponentSig = useSignal<Component<any>>();
  const componentCodeSig = useSignal<string>();

  useTask$(async () => {
    // eslint-disable-next-line qwik/valid-lexical-scope
    MetaGlobComponentSig.value = await metaGlobComponents[componentPath](); // We need to call `await metaGlobComponents[componentPath]()` in development as it is `eager:false`
    componentCodeSig.value = await rawComponents[componentPath]();
  });

  return (
    <div class="mb-12 rounded-xl shadow-lg">
      {!props.vertical ? (
        <Carousel.Root>
          <Carousel.Pagination>
            <Carousel.Bullet>Preview</Carousel.Bullet>
            <Carousel.Bullet>Code</Carousel.Bullet>
          </Carousel.Pagination>

          <Carousel.Slide>
            <section class="flex flex-col items-center">
              {MetaGlobComponentSig.value && <MetaGlobComponentSig.value />}
            </section>
          </Carousel.Slide>
          <Carousel.Slide>
            <Highlight code={componentCodeSig.value || ''} />
          </Carousel.Slide>
        </Carousel.Root>
      ) : (
        <div>
          <section class="flex justify-center space-x-6 rounded-t-md border p-8">
            {MetaGlobComponentSig.value && <MetaGlobComponentSig.value />}
          </section>
          <Highlight
            class="rounded-none rounded-b-md border p-8"
            code={componentCodeSig.value || ''}
          />
        </div>
      )}
    </div>
  );
});
