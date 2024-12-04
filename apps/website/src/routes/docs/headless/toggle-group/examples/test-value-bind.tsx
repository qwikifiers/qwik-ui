import { component$, useSignal, useStyles$ } from '@qwik.dev/core';
import styles from '../snippets/toggle.css?inline';

import { ToggleGroup } from '@qwik-ui/headless';

export default component$(() => {
  const valueSelected = useSignal<string>('left');

  useStyles$(styles);

  return (
    <div class="toggle-container">
      <ToggleGroup.Root bind:value={valueSelected}>
        <ToggleGroup.Item value="left" aria-label="Left aligned" class="toggle">
          Left
        </ToggleGroup.Item>
        <ToggleGroup.Item value="center" aria-label="Center aligned" class="toggle">
          Center
        </ToggleGroup.Item>
        <ToggleGroup.Item value="right" aria-label="Right aligned" class="toggle">
          Right
        </ToggleGroup.Item>
      </ToggleGroup.Root>
      <span test-data-bounded-span>You selected: {valueSelected.value}</span>
    </div>
  );
});
