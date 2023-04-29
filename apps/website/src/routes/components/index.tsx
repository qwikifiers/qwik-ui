import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <h1 class="text-6xl font-bold mx-auto w-fit">All Components</h1>
      <p class="text-3xl font-medium mt-6 mx-auto w-fit">
        A full showcase of everything, including the ones we're working on.
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI',
};
