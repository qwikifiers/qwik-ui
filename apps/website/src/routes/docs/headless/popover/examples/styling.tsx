import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Popover.Root>
      <Popover.Trigger popovertarget="styling-id" class="popover-trigger">
        Popover Trigger
      </Popover.Trigger>
      {/* popover background-color gets overrided */}
      <Popover.Panel
        class="popover [&[popover]]: [&[popover]]:border-accent [&[popover]]:bg-primary [&[popover]]:text-background"
        id="styling-id"
      >
        Popover
      </Popover.Panel>
    </Popover.Root>
  );
});
