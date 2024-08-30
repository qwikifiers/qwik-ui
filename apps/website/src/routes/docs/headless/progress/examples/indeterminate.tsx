import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Progress } from '@qwik-ui/headless';
import styles from '../snippets/progress.css?inline';

export default component$(() => {
  useStyles$(styles);

  const progressSig = useSignal(null);

  return (
    <Progress.Root value={progressSig.value} class="progress">
      <Progress.Indicator class="progress-indicator indeterminate" />
    </Progress.Root>
  );
});
