import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      <h1>
        Welcome to Qwik UI <span class="lightning">⚡️</span>
      </h1>
      <main>TODO: add content here</main>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik UI',
};
