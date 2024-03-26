import { component$, useStyles$ } from '@builder.io/qwik';
import { Progress, ProgressIndicator } from '@qwik-ui/headless';
import styles from '../snippets/progress.css?inline';

export default component$(() => {
  useStyles$(styles);

  const progress = 30;

  return (
    <Progress value={progress} class="progress">
      <ProgressIndicator
        class="progress-indicator"
        style={{
          transform: `translateX(-${100 - progress}%)`,
        }}
      />
    </Progress>
  );
});
