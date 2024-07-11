import { component$, useStyles$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(`
    .tooltip-panel {
      background-color: #222;
      color: #fff;
      padding: 15px;
      border-radius: 8px;
      position: relative;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: opacity 0.3s ease;
      opacity: 0;
    }

    .tooltip-panel[data-state="open"] {
      opacity: 1;
    }

    .tooltip-arrow {
      position: absolute;
      width: 20px;
      height: 10px;
      overflow: hidden;
    }

    .tooltip-arrow::before {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #222;
      top: -5px;
      left: calc(50% - 5px);
      transform: rotate(45deg);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: top 0.3s ease;
    }

    .tooltip-panel[data-state="open"] .tooltip-arrow::before {
      top: -8px;
    }
  `);

  return (
    <Tooltip.Root gutter={4} flip>
      <Tooltip.Trigger>Hover or Focus me</Tooltip.Trigger>
      <Tooltip.Panel aria-label="Tooltip content" class="tooltip-panel">
        <Tooltip.Arrow class="tooltip-arrow" width={20} height={10} />
        <div>
          <h3 style="margin: 0 0 10px;">Tooltip Title</h3>
          <p style="margin: 0;">This tooltip has a snazzy styled arrow!</p>
        </div>
      </Tooltip.Panel>
    </Tooltip.Root>
  );
});
