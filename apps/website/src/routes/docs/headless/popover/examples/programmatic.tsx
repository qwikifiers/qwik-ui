import { component$ } from '@builder.io/qwik';
import { Popover, usePopover } from '@qwik-ui/headless';
import { Button } from '@qwik-ui/styled';
export default component$(() => {
  const { togglePopover } = usePopover(`programmatic-id`);
  return (
    <>
      <Button
        preventdefault:click
        onKeyDown$={(e) => {
          if (e.key === 'o') {
            togglePopover();
          }
        }}
      >
        Focus me and press the 'o' key!
      </Button>
      <Popover id="programmatic-id" class="popover">
        I was programmatically opened!
      </Popover>
    </>
  );
});
