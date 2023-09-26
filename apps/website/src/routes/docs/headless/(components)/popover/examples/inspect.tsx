import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <button
        popovertarget="inspect-id"
        class="rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
      >
        Inspect the popover!
      </button>
      <Popover
        id="inspect-id"
        class="shadow-dark-medium max-w-[20rem] rounded-md border-2 border-slate-300 bg-slate-800 p-4"
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
