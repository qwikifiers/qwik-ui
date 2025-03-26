import { component$, useStyles$, useSignal } from '@builder.io/qwik';
import { Switch } from '@qwik-ui/headless';

export default component$(() => {
  const checked = useSignal(true);
  useStyles$(styles);
  return (
    <Switch.Root class="switch" bind:checked={checked}>
      <Switch.Label>test</Switch.Label>
      <Switch.Input />
    </Switch.Root>
  );
});

import styles from '../snippets/switch.css?inline';
