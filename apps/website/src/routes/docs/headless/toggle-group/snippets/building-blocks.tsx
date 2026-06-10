import { component$ } from '@qwik.dev/core';
import { ToggleGroup } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <ToggleGroup.Root>
      <ToggleGroup.Item value="left" aria-label="Left aligned">
        Left
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" aria-label="Center aligned">
        Center
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" aria-label="Right aligned">
        Right
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
});
