import { component$, Signal, Slot, useSignal } from '@builder.io/qwik';
import { Modal, ModalContent, ModalHeader } from '@qwik-ui/headless';
import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';

export const Example01 = component$(() => {
  const openSig: Signal = useSignal(false);

  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <button onClick$={() => (openSig.value = true)}>Open Modal</button>

        <Modal show={openSig.value} class="p-4">
          <ModalHeader>
            <h2 class="mb-2 text-2xl">Are you absolutely sure?</h2>
          </ModalHeader>
          <ModalContent class="grid gap-1">
            <p>
              This action cannot be undone. This will permanently delete your account and
              remove your data from our servers.
            </p>
            <footer class="flex justify-end gap-4">
              <button
                onClick$={() => (openSig.value = false)}
                class="font-font-medium rounded-md border-2 border-slate-400 p-2 text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick$={() => (openSig.value = false)}
                class="font-font-medium rounded-md border-2 border-orange-600 p-2 text-orange-600"
              >
                Yes, delete account
              </button>
            </footer>
          </ModalContent>
        </Modal>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
