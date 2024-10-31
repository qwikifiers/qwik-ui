import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Switch } from '@qwik-ui/headless';


export default component$(() => {
  const checked = useSignal(false)
  const count = useSignal(0);
  useStyles$(styles);

  return (
    <Switch.Root
      class="switch"
      bind:checked={checked}
      onChange$={() => count.value++}
    >
      <Switch.Label>test{count.value}</Switch.Label>
      <Switch.Input />
    </Switch.Root>
  );
});

import styles from '../snippets/switch.css?inline';


