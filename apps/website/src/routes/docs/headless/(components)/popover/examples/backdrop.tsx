import { component$, useStyles$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';
import styles from './backdrop.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <button
        // @ts-ignore
        popovertarget="backdrop-id"
        class="backdrop rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
      >
        Popover Trigger
      </button>
      <Popover
        id="backdrop-id"
        class="shadow-dark-medium backdrop rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1"
      >
        Popover
      </Popover>
    </>
  );
});
