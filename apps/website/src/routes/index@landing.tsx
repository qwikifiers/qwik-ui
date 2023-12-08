import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { Card, CardBody, CardImage, CardTitle } from '@qwik-ui/headless';
import { useAppState } from '../_state/use-app-state';

export default component$(() => {
  const { featureFlags } = useAppState();

  return (
    <div class="flex flex-col gap-8">
      <h1 class="text-center text-3xl font-bold leading-normal lg:text-5xl">
        <span class="text-qwikui-blue-500 dark:text-qwikui-purple-400 font-black tracking-wide">
          Qwik
        </span>{' '}
        <span class="text-qwikui-purple-400 dark:text-qwikui-blue-500 font-black tracking-wide">
          UI
        </span>
      </h1>
      <h2 class="text-center text-2xl font-bold leading-normal lg:text-4xl">
        The world's fastest loading UI components <br />
        <span class="text-qwikui-blue-500 dark:text-qwikui-purple-400  leading-normal">
          automatically optimized for you
        </span>
      </h2>
      <p class="text-center text-xl font-medium lg:text-2xl">
        Choose a kit and start building the future{' '}
        <span class="hue-rotate-[150deg]">⚡</span>
      </p>
      <div class="mt-4 flex flex-wrap justify-center justify-items-center gap-14">
        <a
          href={`/docs/headless/introduction`}
          class="ease-step shadow-light-medium dark:shadow-dark-high relative block rounded-b-xl rounded-t-md border-2 outline-1 duration-150 hover:scale-[1.025] focus:scale-[1.025]"
        >
          <Card class="max-w-[450px]">
            <CardImage
              src={`/images/qwik-ui-headless-hero.webp`}
              width="611"
              height="408"
              alt={`fluffy kit`}
              class="h-64 w-full rounded-t-sm object-cover"
            />
            <CardBody class={`border-t- px-8 py-6`}>
              <CardTitle class="flex justify-between text-xl font-bold">
                <span>Headless Qwik Components</span>
              </CardTitle>
              <p class="mt-2 leading-normal">
                Qwik components which are{' '}
                <strong>unstyled, accessible, and open-source</strong>, designed for
                creating high-quality web applications and design systems.
              </p>
            </CardBody>
          </Card>
        </a>
        {featureFlags?.showFluffy && (
          <a
            href={`/docs/fluffy/introduction`}
            class="ease-step shadow-light-medium dark:shadow-dark-high relative block
          rounded-b-xl rounded-t-md border-2 duration-150 hover:scale-[1.025] focus:scale-[1.025]"
          >
            <Card class="max-w-[450px] overflow-hidden">
              <CardImage
                src={`/images/qwik-ui-fluffy-creature-screen.webp`}
                width="611"
                height="408"
                alt={`fluffy kit`}
                class="h-64 rounded-t-sm object-cover"
              />
              <CardBody class={`border-t- bg-transparent px-8 py-6`}>
                <CardTitle class="flex items-center justify-between text-xl font-bold">
                  <span>Fluffy (Styled) Qwik Components</span>
                </CardTitle>
                <p class="mt-2 leading-normal">
                  A collection of beautifully crafted, <strong>copy paste</strong> Qwik
                  components that can be integrated into your applications with ease.
                </p>
              </CardBody>
            </Card>
          </a>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik UI - The world's fastest loading UI components library",
};
