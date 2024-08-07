import { component$, useStyles$ } from '@builder.io/qwik';
import { Progress } from '@qwik-ui/headless';
import styles from '../snippets/progress.css?inline';

export default component$(() => {
  useStyles$(styles);

  const progress = 30;

  return (
    <Progress.Root value={progress} class="progress">
      <Progress.Indicator class="progress-indicator" />
    </Progress.Root>
  );
});
