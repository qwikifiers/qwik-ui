import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import styles from '../snippets/toggle.css?inline';

import { ToggleGroup } from '@qwik-ui/headless';

export default component$(() => {
  const valueSelected = useSignal<string>('left');

  useStyles$(styles);

  return (
    <div class="toggle-container">
      <ToggleGroup.Root
        value={'left'}
        onChange$={(v: string) => {
          valueSelected.value = v;
        }}
      >
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
      <span>You selected: {valueSelected.value}</span>
    </div>
  );
});
