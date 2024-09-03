import { component$, useStyles$ } from '@builder.io/qwik';
import { Progress } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  return (
    <Progress.Root value={100} class="progress">
      <Progress.Indicator class="progress-indicator" />
    </Progress.Root>
  );
});

// internal
import styles from '../snippets/progress.css?inline';
