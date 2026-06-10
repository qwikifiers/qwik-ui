import { component$ } from '@qwik.dev/core';
import { Tooltip } from '@qwik-ui/headless';

import '../snippets/arrow-styling.css';

export default component$(() => {
  return (
    <Tooltip.Root gutter={4} flip>
      <Tooltip.Trigger>Hover or Focus me</Tooltip.Trigger>
      <Tooltip.Panel aria-label="Tooltip content" class="tooltip-arrow-styled-panel">
        <Tooltip.Arrow class="tooltip-arrow-styled-arrow" width={20} height={10} />
        <div>
          <h3 style="margin: 0 0 10px;">Tooltip Title</h3>
          <p style="margin: 0;">This tooltip has a snazzy styled arrow!</p>
        </div>
      </Tooltip.Panel>
    </Tooltip.Root>
  );
});
