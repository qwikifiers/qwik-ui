import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="flex flex-col items-center">
      <h1 class="text-5xl">Qwik UI</h1>
      <p class="mt-6 text-lg">The components library for Qwik</p>
      <a href="/docs">
        <button class="link" type="button">
          All components
        </button>
      </a>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'QwikUI',
};
