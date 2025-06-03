import { component$ } from '@builder.io/qwik';
import { Tooltip, badgeVariants } from '~/components/ui';

export default component$(() => {
  return (
    <Tooltip.Root flip={false} gutter={8}>
      <Tooltip.Trigger class={badgeVariants({ look: 'outline' })}>
        Hover over me.
      </Tooltip.Trigger>
      <Tooltip.Panel>
        <p>Add to library</p>
      </Tooltip.Panel>
    </Tooltip.Root>
  );
});
