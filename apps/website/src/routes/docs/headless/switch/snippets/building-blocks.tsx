import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Switch } from '@qwik-ui/headless';

export default component$(() => {
  const checked = useSignal(false);
  useStyles$(styles);

  return (
    <Switch.Root bind:checked={checked}>
      <Switch.Label>test</Switch.Label>
      <Switch.Input />
    </Switch.Root>
  );
});

import styles from '../snippets/switch.css?inline';
