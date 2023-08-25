import { component$, Signal, Slot, useSignal } from '@builder.io/qwik';
import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';
import { Modal, ModalApi, ModalContent, ModalHeader } from '@qwik-ui/headless';

export const Example01 = component$(() => {
  const modalApi: Signal<ModalApi | undefined> = useSignal();

  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <button onClick$={() => modalApi.value?.open$()}>Open Modal</button>

        <Modal api={modalApi}>
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
