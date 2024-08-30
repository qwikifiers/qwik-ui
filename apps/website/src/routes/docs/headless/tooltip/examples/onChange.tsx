import { component$, useSignal } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/headless';

export default component$(() => {
  const tooltipState = useSignal<'open' | 'closed'>('closed');

  return (
    <>
      <Tooltip.Root gutter={4} onOpenChange$={(e) => (tooltipState.value = e)} flip>
        <Tooltip.Trigger>Hover or Focus me</Tooltip.Trigger>
        <Tooltip.Panel aria-label="Tooltip content">
          <Tooltip.Arrow width={10} height={5} />
          Tooltip content here
        </Tooltip.Panel>
      </Tooltip.Root>
      The tooltip is {tooltipState.value}
    </>
  );
});
