import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <PopoverTrigger popovertarget="inspect-id" class="popover-trigger">
        Inspect the popover!
      </PopoverTrigger>
      <Popover id="inspect-id" class="popover">
        <p>
          I'm in the <strong>:top-layer</strong> pseudo element on supported browsers like
          chrome.
        </p>
        <p style={{ marginTop: '1rem' }}>
          On unsupported browsers I'm in the qwik-ui-polyfill div at the end of the
          document.
        </p>
      </Popover>
    </>
  );
});
