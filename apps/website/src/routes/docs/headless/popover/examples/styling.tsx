import { component$ } from '@qwik.dev/core';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Popover.Root>
      <Popover.Trigger class="popover-trigger">Popover Trigger</Popover.Trigger>
      {/* popover background-color gets overrided */}
      <Popover.Panel class="[&[popover]]: [&[popover]]:border-accent [&[popover]]:bg-primary [&[popover]]:p-3 [&[popover]]:text-foreground">
        Popover
      </Popover.Panel>
    </Popover.Root>
  );
});
