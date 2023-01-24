import { component$, useSignal } from '@builder.io/qwik';
import { Toggle } from '@qwik-ui/daisy';

export default component$(() => {
  const toggleChecked = useSignal(false);
  return (
    <>
      <h2>This is the documentation for the Toogle</h2>
      <Toggle
        checked={toggleChecked.value}
        onClick$={() => {
          toggleChecked.value = !toggleChecked.value;
        }}
      />
    </>
  );
});
