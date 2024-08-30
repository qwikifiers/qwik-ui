import { component$, useSignal, useStyles$, $ } from '@builder.io/qwik';
import { Progress } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  const initialNumTreats = 25;

  const totalTreats = useSignal(initialNumTreats);
  const treatsEaten = 20;

  const space = { margin: '1rem' };

  const increment = $(() => totalTreats.value++);
  const decrement = $(() => {
    if (totalTreats.value > 20) totalTreats.value--;
  });

  return (
    <>
      <p style={space}>🧁 Tiara's Treats</p>

      <div>
        Total treats:
        <button onClick$={decrement} style={space}>
          -
        </button>
        <span>{totalTreats.value}</span>
        <button onClick$={increment} style={space}>
          +
        </button>
      </div>

      <Progress.Root
        value={Number(treatsEaten)}
        max={Number(totalTreats.value)}
        class="progress"
      >
        <Progress.Indicator class="progress-indicator" />
      </Progress.Root>

      <p style={space}>Number of eaten treats: {treatsEaten}</p>
    </>
  );
});

// internal
import styles from '../snippets/progress.css?inline';
