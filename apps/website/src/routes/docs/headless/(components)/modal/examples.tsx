import { component$, Signal, Slot, useSignal } from '@builder.io/qwik';
import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';
import { Modal, ModalContent, ModalHeader } from '@qwik-ui/headless';

export const Example01 = component$(() => {
  const openSig: Signal = useSignal(false);

  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <button onClick$={() => (openSig.value = true)}>Open Modal</button>

        <Modal open={openSig}>
          <ModalHeader>
            <h2>Hi 👋🏻</h2>
          </ModalHeader>
          <ModalContent>I am a Modal</ModalContent>
        </Modal>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
