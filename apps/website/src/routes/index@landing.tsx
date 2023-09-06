import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { useRootStore } from '../_state/use-root-store';
import { Card, CardBody, CardImage, CardTitle } from '@qwik-ui/headless';

export default component$(() => {
  const { featureFlags } = useRootStore();

  return (
    <div class="flex flex-col gap-8 text-gray-950 dark:text-white">
      <h1 class="text-3xl lg:text-5xl text-center leading-normal font-bold">
        <span class="text-qwikui-purple-400 font-[900] tracking-wide">Qwik</span>{' '}
        <span class="text-qwikui-blue-500 font-[900] tracking-wide">UI</span>
      </h1>
      <h2 class="text-2xl lg:text-4xl text-center leading-normal font-bold">
        Headless or opinionated components for the <br />
        <span class="text-[var(--qwik-light-blue)] leading-normal">
          next-generation framework
        </span>
      </h2>
      <p class="text-xl lg:text-2xl text-center font-medium">
        Choose a kit and start building the future{' '}
        <span class="hue-rotate-[150deg]">⚡</span>
      </p>
      <div class="gap-8 flex flex-wrap justify-center justify-items-center">
        <a
          href={`/docs/headless/introduction`}
          class=" border-2 border-slate-800 dark:border-slate-300 block
          hover:scale-[1.025] 
                focus:scale-[1.025] duration-150 ease-step relative rounded-b-xl rounded-t-md shadow-light-high dark:shadow-dark-high"
        >
          <Card class="max-w-[450px]">
            <CardImage
              src={`/images/qwikui-hero.webp`}
              width="611"
              height="408"
              alt={`fluffy kit`}
              class="bg-gradient-to-r from-[var(--qwik-light-blue)] 
              to-[var(--qwik-light-purple)] h-64 w-full object-cover rounded-t-[.225rem]"
            />
            <CardBody
              class={`px-8 py-6 border-t-[2px] border-slate-800 dark:border-slate-300`}
            >
              <CardTitle class="flex justify-between items-center text-xl font-bold">
                <span>Qwik UI Headless</span>
              </CardTitle>
              <p class="mt-2 leading-normal">
                Qwik primitives that are{' '}
                <strong>unstyled, accessible, and open-source</strong>, designed for
                creating high-quality web applications and design systems.
              </p>
            </CardBody>
          </Card>
          <span class="text-white rounded-md border-[1px] border-qwikui-purple-600 text-[12px] px-2 py-1 bg-qwikui-purple-500 absolute top-[5px] left-[5px] font-bold shadow-dark-medium">
            Core Package
          </span>
        </a>
        {featureFlags?.showTailwind && (
          <a
            href={`/docs/tailwind/introduction`}
            class=" border-2 border-2 border-slate-800 dark:border-slate-300 block
          hover:scale-[1.025]
                focus:scale-[1.025] duration-150 ease-step relative rounded-b-xl rounded-t-md shadow-light-high dark:shadow-dark-high"
          >
            <Card class="max-w-[450px] overflow-hidden">
              <CardImage
                src={`/images/fluffy-hero.webp`}
                width="611"
                height="408"
                alt={`fluffy kit`}
                class="h-64 object-cover rounded-t-[.225rem]"
              />
              <CardBody
                class={`px-8 py-6 border-t-[2px] border-slate-800 dark:border-slate-300 bg-transparent`}
              >
                <CardTitle class="flex justify-between items-center text-xl font-bold">
                  <span>Fluffy</span>
                </CardTitle>
                <p class="mt-2 leading-normal">
                  A collection of beautifully crafted, <strong>copy paste</strong>{' '}
                  components that can be integrated into your applications with ease.
                </p>
              </CardBody>
            </Card>
            <span class="text-white rounded-md border-[1px] border-qwikui-blue-600 text-[12px] px-2 py-1 bg-qwikui-blue-500 absolute top-[5px] left-[5px] font-bold shadow-dark-medium">
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
