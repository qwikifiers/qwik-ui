import { component$ } from '@builder.io/qwik';
import Accordion from '~/components/accordion/accordion';

export default component$(() => {
  return (
    <>
      <h1 class="text-lg font-medium">
        Qwik UI Headless Accordion stackblitz template 🤯
      </h1>
      <Accordion />
    </>
  );
});
