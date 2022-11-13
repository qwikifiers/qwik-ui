import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>hello</div>;
});

export const head: DocumentHead = {
  title: 'Qwik-ui Components',
};
