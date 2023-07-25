import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { useRootStore } from '../_state/use-root-store';
import KitSelectionCTA from './_components/kit-selection-cta/kit-selection-cta';

export default component$(() => {
  const { featureFlags } = useRootStore();

  return (
    <div class="flex flex-col gap-8">
      <h1 class="text-3xl lg:text-5xl text-center leading-normal font-bold">
        <span class="text-[var(--qwik-light-purple)]">Qwik</span>{' '}
        <span class="text-[var(--qwik-light-blue)]">UI</span>
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
      <div class="gap-8 flex flex-col lg:flex-row w-full justify-center justify-items-center">
        <KitSelectionCTA kit="headless">
          Accessibility built-in and unstyled for your bespoke designs and custom needs.
        </KitSelectionCTA>
        {featureFlags?.showTailwind && (
          <KitSelectionCTA kit="tailwind">
            Built on top of the Headless kit, ready-to-use components coated with a dash
            of Tailwind.
          </KitSelectionCTA>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI - The first component library for Qwik'
};
