import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/ui';

export default component$(() => {
  const checked = useSignal(false);
  return (
    <>
      <Switch.Root class="switch" bind:checked={checked}>
        <Switch.Label>label</Switch.Label>
        <Switch.Input />
      </Switch.Root>
    </>
  );
});
