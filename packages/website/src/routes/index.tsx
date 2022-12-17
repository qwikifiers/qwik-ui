import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      This will be a real website soon :)
      <hr />
      <a href="/headless-example">headless examples</a>
      <hr />
      <a href="/daisy-example">daisy examples</a>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
