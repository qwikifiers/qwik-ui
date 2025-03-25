import { component$, useStyles$ } from '@qwik.dev/core';
import styles from '../snippets/toggle.css?inline';
import { ToggleGroup } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  return (
    <div>
      <div test-data-outside-root-top>OutsideRoot Top</div>
      <div class="toggle-container">
        <ToggleGroup.Root value={'center'}>
          <ToggleGroup.Item value="left" class="toggle">
            Left
          </ToggleGroup.Item>
          <ToggleGroup.Item value="center" class="toggle">
            Center
          </ToggleGroup.Item>
          <ToggleGroup.Item value="right" class="toggle">
            Right
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>
      <button test-data-outside-root-bottom-button>OutsideRoot Bottom button</button>
    </div>
  );
});
