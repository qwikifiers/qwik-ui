import { component$, useStyles$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(`
  .my-transition {
    transition: opacity 0.5s, display 0.5s, overlay 0.5s;
    transition-behavior: allow-discrete;
    opacity: 0;
  }

  .popover-showing {
    opacity: 1;
  }

  .popover-closing {
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
