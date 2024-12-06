import { component$, useStyles$ } from '@builder.io/qwik';
import styles from '../snippets/toggle.css?inline';
import { ToggleGroup } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  return (
    <div>
      <div test-data-outside-root-top>OutsideRoot Top</div>
      <div class="toggle-container">
        <ToggleGroup.Root multiple>
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
      </div>
      <button test-data-outside-root-bottom-button>OutsideRoot Bottom button</button>
    </div>
  );
});
