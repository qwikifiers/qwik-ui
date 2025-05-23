import { component$, useStyles$ } from '@builder.io/qwik';
import { Switch } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  return (
    <Switch.Root class="switch" checked>
      <Switch.Label>test</Switch.Label>
      <Switch.Input>
        <Switch.Thumb />
      </Switch.Input>
    </Switch.Root>
  );
});

import styles from '../snippets/switch.css?inline';
