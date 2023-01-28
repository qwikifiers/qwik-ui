import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>How to use page</div>;
});

export const head: DocumentHead = {
  title: 'QwikUI Usage',
};
