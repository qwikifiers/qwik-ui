import { component$ } from '@qwik.dev/core';
import { Tooltip } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Tooltip.Root gutter={4} flip>
      <Tooltip.Trigger>Hover or Focus me</Tooltip.Trigger>
      <Tooltip.Panel aria-label="Tooltip content">
        <Tooltip.Arrow width={10} height={5} />
        Tooltip content here
      </Tooltip.Panel>
    </Tooltip.Root>
  );
});
