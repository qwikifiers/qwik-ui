import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import OptionalThemeButton from '../components/optionalThemeButton/optionalThemeButton';

export default component$(() => {
  return (
    <div class="flex flex-col items-center">
      <h1 class="text-5xl">Qwik UI</h1>
      <p class="mt-6 text-lg">The components library for Qwik</p>
      <div class=" gap-6 flex flex-col lg:flex-row  w-full justify-center justify-items-center">
        <OptionalThemeButton theme="Headless" />
        <OptionalThemeButton theme="Daisy" />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'QwikUI',
};
