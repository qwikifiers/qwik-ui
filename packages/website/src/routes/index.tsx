import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>This will be a real website soon :)</div>;
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
