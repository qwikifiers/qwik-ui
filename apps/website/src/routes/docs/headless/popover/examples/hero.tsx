import { component$, useStyles$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(`
    .my-transition {
      transition: 300ms opacity ease;
    }

    .my-transition.popover-showing {
      opacity: 1;
    }

    .my-transition.popover-closing {
      opacity: 0;
    }
  `);

  return (
    <>
      <PopoverTrigger
        popovertarget="hero-id"
        class="rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
      >
        Popover Trigger
      </PopoverTrigger>
      <Popover
        id="hero-id"
        class="shadow-dark-medium my-transition rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 opacity-0"
      >
        My Hero!
      </Popover>
    </>
  );
});
