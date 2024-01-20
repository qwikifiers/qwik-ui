import { component$, useStyles$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(`
  .my-animation.popover-showing {
    animation: popoverFadeIn 300ms ease;
  }

  .my-animation.popover-closing {
    animation: popoverFadeOut 300ms ease;
  }

    @keyframes popoverFadeIn
    from {
      opacity: 0;
    } to {
      opacity: 1;
    }
    
    @keyframes popoverFadeOut
    from {
      opacity: 1;
    } to {
      opacity: 0;
    }
  `);

  return (
    <>
      <PopoverTrigger
        popovertarget="inspect-id"
        class="rounded-sm border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
      >
        Inspect the popover!
      </PopoverTrigger>
      <Popover
        id="inspect-id"
        class="shadow-dark-medium max-w-[20rem] rounded-sm border-2 border-slate-300 bg-slate-800 p-4"
      >
        <p class="leading-5">
          I'm in the <strong>:top-layer</strong> pseudo element on supported browsers like
          chrome.
        </p>
        <p class="mt-4 leading-5">
          On unsupported browsers I'm in the qwik-ui-polyfill div at the end of the
          document.
        </p>
      </Popover>
    </>
  );
});
