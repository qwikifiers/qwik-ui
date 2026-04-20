import { component$ } from '@qwik.dev/core';
import { Tooltip, badgeVariants } from '~/components/ui';

export default component$(() => {
  return (
    <Tooltip.Root flip={false} gutter={8}>
      <Tooltip.Trigger class={badgeVariants({ look: 'outline' })}>
        Hover over me 👀
      </Tooltip.Trigger>
      <Tooltip.Panel>
        <p>I'm a tooltip</p>
      </Tooltip.Panel>
    </Tooltip.Root>
  );
});
