import { $, component$ } from '@builder.io/qwik';
import { Toggle } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <Toggle.Root pressed onClick$={$(() => console.log('Toggle'))} />
    </>
  );
});
