import { component$ } from '@builder.io/qwik';
import { ToggleGroup } from '~/components/ui';

export default component$(() => {
  return (
    <ToggleGroup.Root disabled>
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
