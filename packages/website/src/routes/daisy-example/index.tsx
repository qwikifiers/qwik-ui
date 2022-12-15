import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Collapse } from '@qwik-ui/daisy';

export default component$(() => {
  return (
    <div>
      <Collapse label="Hi Glenn and Gil!">Bla</Collapse>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
