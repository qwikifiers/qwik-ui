import { component$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>Hover over me</Tooltip.Trigger>
      <Tooltip.Content>I'm a tooltip!</Tooltip.Content>
    </Tooltip.Root>
  );
});
