import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Progress } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  const progress = 30;
  const isRendered = useSignal(false);

  return (
    <>
      <button onClick$={() => (isRendered.value = true)}>Render the progress bar</button>
      {isRendered.value && (
        <Progress.Root value={progress} class="progress">
          <Progress.Indicator class="progress-indicator" />
        </Progress.Root>
      )}
    </>
  );
});

// internal
import styles from '../snippets/progress.css?inline';
