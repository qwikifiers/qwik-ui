import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => (
  <>
    <Popover.Trigger popovertarget="building-block">Trigger</Popover.Trigger>
    <Popover.Panel id="building-block">Content</Popover.Panel>
  </>
));
