import { component$, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>I'm daisy!!!</div>;
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
