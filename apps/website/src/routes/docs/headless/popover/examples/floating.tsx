import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Popover.Root hover floating="top" gutter={4}>
      <div class="popover-container">
        <p>I'm a mini tooltip!</p>
        <Popover.Trigger class="popover-trigger">Hover over me</Popover.Trigger>
      </div>

      <Popover.Panel class="popover">I am anchored to the trigger!</Popover.Panel>
    </Popover.Root>
  );
});
