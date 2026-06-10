import { component$, useStyles$ } from '@qwik.dev/core';
import { Progress } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  const progress = 30;

  return (
    <Progress.Root value={progress} class="progress">
      <Progress.Indicator class="progress-indicator" />
    </Progress.Root>
  );
});

// internal
import styles from '../snippets/progress.css?inline';
