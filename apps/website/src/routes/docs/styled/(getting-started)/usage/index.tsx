import { component$ } from '@qwik.dev/core';
import type { DocumentHead } from '@qwik.dev/router';

export default component$(() => {
  return (
    <div>
      <h1 class="text-xl">Getting Started</h1>
      <div class="mt-4">
        <p>How to use page</p>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'QwikUI Usage',
};
