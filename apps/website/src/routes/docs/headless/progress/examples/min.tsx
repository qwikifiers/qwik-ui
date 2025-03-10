import { component$, useSignal, useStyles$, $ } from '@qwik.dev/core';
import { Progress } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  const fundraisingGoal = 10000;
  const amountRaised = 5000;
  const minGoal = useSignal(2000);

  const space = { margin: '1rem' };

  const incrementMin = $(() => {
    if (minGoal.value < amountRaised) minGoal.value += 500;
  });

  const decrementMin = $(() => {
    if (minGoal.value > 0) minGoal.value -= 500;
  });

  return (
    <div style={{ userSelect: 'none', display: 'contents' }}>
      <p style={space}>🎗️ Charity Fundraiser</p>

      <div>
        Initial funding:
        <button onClick$={decrementMin} style={space}>
          -
        </button>
        <span>${minGoal.value}</span>
        <button onClick$={incrementMin} style={space}>
          +
        </button>
      </div>

      <div style={space}>Amount raised: ${amountRaised}</div>

      <Progress.Root
        value={amountRaised}
        max={fundraisingGoal}
        min={minGoal.value}
        class="progress"
      >
        <Progress.Indicator class="progress-indicator" />
      </Progress.Root>

      <p style={space}>Funding goal: ${fundraisingGoal}</p>
    </div>
  );
});

// internal
import styles from '../snippets/progress.css?inline';
