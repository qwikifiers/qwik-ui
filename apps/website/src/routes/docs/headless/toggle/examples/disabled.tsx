import { component$, useStyles$ } from '@qwik.dev/core';
import { Toggle } from '@qwik-ui/headless';
import styles from '../snippets/toggle.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <div class="toggle-container">
      <Toggle disabled class="toggle">
        Hello
      </Toggle>
    </div>
  );
});
