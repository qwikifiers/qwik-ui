import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/ui';

export default component$(() => {
  const checked = useSignal(true);
  return (
    <Switch.Root class="switch" bind:checked={checked}>
      <Switch.Label>test</Switch.Label>
      <Switch.Input>
        <Switch.Thumb />
      </Switch.Input>
    </Switch.Root>
  );
});
