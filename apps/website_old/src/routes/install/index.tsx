import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      <h1 class="text-xl">Installation</h1>
      <div class="mt-4">
        <p>Installation of the headless components package</p>
        <pre>npm install -D @qwik-ui/headless</pre>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'QwikUI Installation',
};
