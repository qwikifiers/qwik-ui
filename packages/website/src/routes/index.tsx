import { $, component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>Root Documentation Page</div>;
});

export const head: DocumentHead = {
  title: 'QwikUI',
};
