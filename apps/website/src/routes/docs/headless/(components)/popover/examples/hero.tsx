import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';
import './hero.css';

export default component$(() => {
  /* same as tailwind slate */

  return (
    <>
      <button popovertarget="example-id">Open Popover!</button>
      <Popover id="example-id">I'm on top of everything!</Popover>
    </>
  );
});
