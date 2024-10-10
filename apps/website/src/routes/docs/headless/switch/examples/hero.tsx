import { component$, useStyles$ } from '@builder.io/qwik';
import { Switch } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  return (
    <Switch.Root class="switch">
      <Switch.Label>sdsds</Switch.Label>
      <Switch.Input/>
    </Switch.Root>
  );
});


import styles from '../snippets/switch.css?inline';
