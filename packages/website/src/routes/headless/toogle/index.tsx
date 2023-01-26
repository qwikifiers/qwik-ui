import { $, component$, useSignal } from '@builder.io/qwik';
import { Toggle } from '@qwik-ui/headless';

export default component$(() => {
  const toggleChecked = useSignal(false);
  return (
    <>
      <h2>This is the documentation for the Toogle</h2>
      <Toggle
        pressed={toggleChecked.value}
        onClick$={$(() => console.log('toogle'))}
      />
    </>
  );
});
