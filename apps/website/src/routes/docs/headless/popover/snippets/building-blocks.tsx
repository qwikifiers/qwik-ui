import { component$ } from '@qwik.dev/core';
import { Popover } from '@qwik-ui/headless';

export default component$(() => (
  <>
    <Popover.Trigger popovertarget="building-block">Trigger</Popover.Trigger>
    <Popover.Panel id="building-block">Content</Popover.Panel>
  </>
));
