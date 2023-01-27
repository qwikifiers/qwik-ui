import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      Installation of the headless components
      <pre>npm install -D @qwik-ui/headless</pre>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'QwikUI Installation',
};
