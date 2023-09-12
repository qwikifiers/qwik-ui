import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { Card, CardBody, CardImage, CardTitle } from '@qwik-ui/headless';
import { useRootStore } from '../_state/use-root-store';

export default component$(() => {
  const { featureFlags } = useRootStore();

  return (
    <div class="flex flex-col gap-8 text-gray-950 dark:text-white">
      <h1 class="text-center text-3xl font-bold leading-normal lg:text-5xl">
        <span class="text-qwikui-purple-400 font-[900] tracking-wide">Qwik</span>{' '}
        <span class="text-qwikui-blue-500 font-[900] tracking-wide">UI</span>
      </h1>
      <h2 class="text-center text-2xl font-bold leading-normal lg:text-4xl">
        Headless or opinionated components for the <br />
        <span class="leading-normal text-[var(--qwik-light-blue)]">
          next-generation framework
        </span>
      </h2>
      <p class="text-center text-xl font-medium lg:text-2xl">
        Choose a kit and start building the future{' '}
        <span class="hue-rotate-[150deg]">⚡</span>
      </p>
      <div class="flex flex-wrap justify-center justify-items-center gap-8">
        <a
          href={`/docs/headless/introduction`}
          class=" ease-step shadow-light-high dark:shadow-dark-high relative
          block 
                rounded-b-xl rounded-t-md border-2 border-slate-800 duration-150 hover:scale-[1.025] focus:scale-[1.025] dark:border-slate-300"
        >
          <Card class="max-w-[450px]">
            <CardImage
              src={`/images/qwikui-hero.webp`}
              width="611"
              height="408"
              alt={`fluffy kit`}
              class="h-64 w-full 
              rounded-t-[.225rem] bg-gradient-to-r from-[var(--qwik-light-blue)] to-[var(--qwik-light-purple)] object-cover"
            />
            <CardBody
              class={`border-t-[2px] border-slate-800 px-8 py-6 dark:border-slate-300`}
            >
              <CardTitle class="flex items-center justify-between text-xl font-bold">
                <span>Qwik UI Headless</span>
              </CardTitle>
              <p class="mt-2 leading-normal">
                Qwik primitives that are{' '}
                <strong>unstyled, accessible, and open-source</strong>, designed for
                creating high-quality web applications and design systems.
              </p>
            </CardBody>
          </Card>
          <span class="border-qwikui-purple-600 bg-qwikui-purple-500 shadow-dark-medium absolute left-[5px] top-[5px] rounded-md border-[1px] px-2 py-1 text-[12px] font-bold text-white">
            Core Package
          </span>
        </a>
        {featureFlags?.showTailwind && (
          <a
            href={`/docs/tailwind/introduction`}
            class=" ease-step shadow-light-high dark:shadow-dark-high relative block
          rounded-b-xl
                rounded-t-md border-2 border-2 border-slate-800 duration-150 hover:scale-[1.025] focus:scale-[1.025] dark:border-slate-300"
          >
            <Card class="max-w-[450px] overflow-hidden">
              <CardImage
                src={`/images/fluffy-hero.webp`}
                width="611"
                height="408"
                alt={`fluffy kit`}
                class="h-64 rounded-t-[.225rem] object-cover"
              />
              <CardBody
                class={`border-t-[2px] border-slate-800 bg-transparent px-8 py-6 dark:border-slate-300`}
              >
                <CardTitle class="flex items-center justify-between text-xl font-bold">
                  <span>Fluffy</span>
                </CardTitle>
                <p class="mt-2 leading-normal">
                  A collection of beautifully crafted, <strong>copy paste</strong>{' '}
                  components that can be integrated into your applications with ease.
                </p>
              </CardBody>
            </Card>
            <span class="border-qwikui-blue-600 bg-qwikui-blue-500 shadow-dark-medium absolute left-[5px] top-[5px] rounded-md border-[1px] px-2 py-1 text-[12px] font-bold text-white">
              Experimental
            </span>
          </a>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI - The first component library for Qwik',
};
