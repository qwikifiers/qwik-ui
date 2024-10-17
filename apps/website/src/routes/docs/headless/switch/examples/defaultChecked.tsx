import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '@qwik-ui/headless';


export default component$(() => {
  const checked = useSignal(false)
  return (
    <Switch.Root class="switch" defaultChecked bind:checked={checked}>
      <Switch.Label>test</Switch.Label>
      <Switch.Input />
    </Switch.Root>
  );
});



