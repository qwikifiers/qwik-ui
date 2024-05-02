import { component$, useSignal } from '@builder.io/qwik';
import { Toggle } from '@qwik-ui/headless';

export default component$(() => {
  const toggleChecked = useSignal(false);
  return <Toggle.Root pressed={toggleChecked.value} />;
});
