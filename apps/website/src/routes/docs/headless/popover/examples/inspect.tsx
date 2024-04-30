import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Popover.Root>
      <Popover.Trigger class="popover-trigger">Inspect the popover!</Popover.Trigger>
      <Popover.Panel class="popover-panel">
        <p>
          I'm in the <strong>:top-layer</strong> pseudo element on supported browsers like
          chrome.
        </p>
        <p style={{ marginTop: '1rem' }}>
          On unsupported browsers I'm in the qwik-ui-polyfill div at the end of the
          document.
        </p>
      </Popover.Panel>
    </Popover.Root>
  );
});
