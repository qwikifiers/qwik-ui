import { component$ } from '@builder.io/qwik';
import { Switch } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Switch.Root class="switch" checked>
      <Switch.Label>test</Switch.Label>
      <Switch.Input />
    </Switch.Root>
  );
});
