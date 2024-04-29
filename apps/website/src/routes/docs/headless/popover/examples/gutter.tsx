import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Popover.Root floating="top" gutter={40}>
      <div class="popover-container">
        <p>gutter of 40px!</p>
        <Popover.Trigger popovertarget="gutter-id" class="popover-trigger">
          Click me
        </Popover.Trigger>
      </div>

      <Popover.Panel class="popover">I am anchored to the trigger!</Popover.Panel>
    </Popover.Root>
  );
});
