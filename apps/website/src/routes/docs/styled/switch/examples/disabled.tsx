import { component$ } from '@builder.io/qwik';
import { Switch } from '~/components/ui';

export default component$(() => {
  return (
    <Switch.Root class="switch" disabled >
      <Switch.Label>test</Switch.Label>
      <Switch.Input />
    </Switch.Root>
  );
});

