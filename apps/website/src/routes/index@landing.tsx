import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { useRootStore } from '../_state/use-root-store';
import KitSelectionCTA from './_components/kit-selection-cta/kit-selection-cta';

export default component$(() => {
  const { featureFlags } = useRootStore();

  return (
    <div class="flex flex-col gap-8">
      <h1 class="text-center text-3xl font-bold leading-normal lg:text-5xl">
        <span class="text-[var(--qwik-light-purple)]">Qwik</span>{' '}
        <span class="text-[var(--qwik-light-blue)]">UI</span>
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
      <div class="flex w-full flex-col justify-center justify-items-center gap-8 lg:flex-row">
        <KitSelectionCTA kit="headless">
          Accessibility built-in and unstyled for your bespoke designs and custom needs.
        </KitSelectionCTA>
        {featureFlags?.showFluffy && (
          <KitSelectionCTA kit="fluffy">
            Built on top of the Headless kit, ready-to-use components coated with a dash
            of Tailwind.
          </KitSelectionCTA>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI - The first component library for Qwik',
};
