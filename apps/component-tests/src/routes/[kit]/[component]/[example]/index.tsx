import { component$ } from '@qwik.dev/core';
import { ShowcaseTest } from '../../../../components/showcase-test/showcase-test';

export default component$(() => {
  // Need to center the content in the screen
  // so that tests like popover placement can
  // be placed on top and not get overridden by
  // lack of space
  return (
    <div class="flex h-screen items-center justify-center">
      <ShowcaseTest />
    </div>
  );
});
