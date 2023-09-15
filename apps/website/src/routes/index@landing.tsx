import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { Card, CardBody, CardImage, CardTitle } from '@qwik-ui/headless';
import { useAppState } from '../_state/use-app-state';

export default component$(() => {
  const { featureFlags } = useAppState();

  return (
    <div class="flex flex-col gap-8 text-gray-950 dark:text-white">
      <h1 class="text-center text-3xl font-bold leading-normal lg:text-5xl">
        <span class="text-qwikui-purple-400 dark:text-qwikui-purple-500 text-outline-purple-title font-[900] tracking-wide">
          Qwik
        </span>{' '}
        <span class="text-qwikui-blue-400 text-qwikui-blue-200 dark:text-qwikui-blue-500 text-outline-blue-title font-[900] tracking-wide">
          UI
        </span>
      </h1>
      <h2 class="text-center text-2xl font-bold leading-normal lg:text-4xl">
        Headless or opinionated components for the <br />
        <span class="text-qwikui-blue-400 dark:text-qwikui-purple-500 text-outline-lg leading-normal">
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
          class="ease-step shadow-light-medium dark:shadow-dark-high relative block rounded-b-xl rounded-t-md border-2 border-slate-700 outline-[1px] duration-150 hover:scale-[1.025] focus:scale-[1.025] dark:border-slate-400"
        >
          <Card class="max-w-[450px]">
            <CardImage
              src={`/images/qwikui-hero.webp`}
              width="611"
              height="408"
              alt={`fluffy kit`}
              class="h-64 w-full 
              rounded-t-[.125rem] bg-gradient-to-r from-[var(--qwik-light-blue)] to-[var(--qwik-light-purple)] object-cover"
            />
            <CardBody
              class={`border-t-[2px] border-slate-700 px-8 py-6 dark:border-slate-400`}
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
          <span class="border-qwikui-purple-600 bg-qwikui-purple-500 shadow-dark-medium text-outline-purple-title absolute left-[5px] top-[5px] rounded-md border-[1px] px-2 py-1 text-[12px] font-bold tracking-wide text-white">
            Core Package
          </span>
        </a>
        {featureFlags?.showFluffy && (
          <a
            href={`/docs/fluffy/introduction`}
            class=" ease-step shadow-light-medium dark:shadow-dark-high relative block
          rounded-b-xl
                rounded-t-md border-2 border-2 border-slate-700 duration-150 hover:scale-[1.025] focus:scale-[1.025] dark:border-slate-400"
          >
            <Card class="max-w-[450px] overflow-hidden">
              <CardImage
                src={`/images/fluffy-hero.webp`}
                width="611"
                height="408"
                alt={`fluffy kit`}
                class="h-64 rounded-t-[.125rem] object-cover"
              />
              <CardBody
                class={`border-t-[2px] border-slate-700 bg-transparent px-8 py-6 dark:border-slate-400`}
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
            <span class="border-qwikui-blue-600 bg-qwikui-blue-500 shadow-dark-medium text-outline-blue-title absolute left-[5px] top-[5px] rounded-md border-[1px] px-2 py-1 text-[12px] font-bold tracking-wide text-white">
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
