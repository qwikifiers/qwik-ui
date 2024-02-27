import { component$, useStyles$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';
import styles from './backdrop.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <PopoverTrigger
        popovertarget="backdrop-id"
        class="rounded-base border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
      >
        Popover Trigger
      </PopoverTrigger>
      <Popover
        animation
        entryAnimation="opacity-100"
        exitAnimation="opacity-0"
        class="backdrop border-none bg-transparent opacity-0"
        id="backdrop-id"
      >
        {/* Need a child here, or else the pseudo element background takes priority */}
        {/* <div class="rounded-base border-2 border-slate-300 bg-slate-800 px-3 py-1">
          Popover
        </div> */}
        Popover
      </Popover>
    </>
  );
});
