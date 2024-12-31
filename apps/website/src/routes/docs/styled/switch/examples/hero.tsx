import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/ui';

export default component$(() => {
  const checked = useSignal(false);
  return (
    <>
      <Switch.Root bind:checked={checked}>
        <Switch.Label>test</Switch.Label>
        <Switch.Input />
      </Switch.Root>
    </>
  );
});