import { component$, useStyles$ } from '@builder.io/qwik';
import { Toggle } from '@qwik-ui/headless';
import styles from '../snippets/toggle.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <div class="toggle-container">
      <Toggle
        defaultPressed={true}
        class="toggle hover:bg-accent hover:text-accent-foreground"
      >
        Hello
      </Toggle>
    </div>
  );
});
