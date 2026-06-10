import { component$, useSignal } from '@qwik.dev/core';
import { Tooltip } from '@qwik-ui/headless';

export default component$(() => {
  const placement = useSignal<'top' | 'right' | 'bottom' | 'left'>('top');

  return (
    <div>
      <label for="placement">Select Tooltip Placement: </label>
      <select
        id="placement"
        value={placement.value}
        onChange$={(e) =>
          (placement.value = (e.target as HTMLSelectElement).value as
            | 'top'
            | 'right'
            | 'bottom'
            | 'left')
        }
      >
        <option value="top">Top</option>
        <option value="right">Right</option>
        <option value="bottom">Bottom</option>
        <option value="left">Left</option>
      </select>

      <Tooltip.Root key={placement.value} gutter={4} flip placement={placement.value}>
        <Tooltip.Trigger>Hover or Focus me</Tooltip.Trigger>
        <Tooltip.Panel
          aria-label={`Tooltip content on the ${placement.value}`}
          class="tooltip-panel"
        >
          Tooltip content on the {placement.value}
        </Tooltip.Panel>
      </Tooltip.Root>
    </div>
  );
});
