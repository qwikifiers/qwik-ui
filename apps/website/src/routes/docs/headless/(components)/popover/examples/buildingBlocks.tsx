import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <button popovertarget="id">trigger</button>
      <Popover id="id">popover</Popover>
    </>
  );
});
