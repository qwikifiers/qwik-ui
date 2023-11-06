import { component$, useSignal } from '@builder.io/qwik';
import { Toggle } from '@qwik-ui/primitives';

export default component$(() => {
  const toggleChecked = useSignal(false);
  return <Toggle pressed={toggleChecked.value} />;
});
