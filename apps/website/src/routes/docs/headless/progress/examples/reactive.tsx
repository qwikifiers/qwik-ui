import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Progress } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  const progressSig = useSignal(30);

  return (
    <>
      <Progress.Root bind:value={progressSig} class="progress">
        <Progress.Indicator class="progress-indicator" />
      </Progress.Root>
      <button onClick$={() => (progressSig.value = Math.random() * 100)}>
        Change progress
      </button>
    </>
  );
});

// internal
import styles from '../snippets/progress.css?inline';
