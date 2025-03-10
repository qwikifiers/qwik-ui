import { component$ } from '@qwik.dev/core';
import { Tooltip } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Tooltip.Root gutter={4} flip placement="bottom">
      <Tooltip.Trigger>Hover or Focus me</Tooltip.Trigger>
      <Tooltip.Panel aria-label="Complex Tooltip content">
        <Tooltip.Arrow width={10} height={5} />
        <div>
          <h3>Tooltip Title</h3>
          <p>This is a tooltip with complex HTML content, including:</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ul>
        </div>
      </Tooltip.Panel>
    </Tooltip.Root>
  );
});
