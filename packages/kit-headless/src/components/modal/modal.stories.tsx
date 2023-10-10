import { component$, useSignal } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Modal, ModalProps } from './modal';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';
import { ModalPopup } from './modal-popup';

/**
 * Using a component$ here to be able to use `useSignal`.
 * useSignal cannot be used directly inside a story's render-Function.
 */
const DialogStoryComponent = component$((props: ModalProps) => {
  const showSig = useSignal(false);

  return (
    <>
      <button onClick$={() => (showSig.value = true)}>Open Dialog</button>

      <Modal {...props} bind:show={showSig}>
        <ModalPopup aria-describedby="modal-text" aria-labelledby="modal-heading">
          <ModalHeader>
            <h2 id="modal-heading">Hello 👋</h2>
          </ModalHeader>
          <ModalContent>
            <p id="modal-text">I am a simple Modal</p>
            <p>
              {Array(500)
                .fill(null)
                .map(() => 'Hello World')
                .join(' ')}
            </p>
          </ModalContent>
          <ModalFooter>
            <button onClick$={() => (showSig.value = false)}>Close Dialog</button>
          </ModalFooter>
        </ModalPopup>
      </Modal>
      <div style="background-color: red; width: 50vw; height: 150vh"></div>
    </>
  );
});

const meta: Meta<ModalProps> = {
  component: Modal,
  render: (props) => <DialogStoryComponent {...props} />,
};

type Story = StoryObj<ModalProps>;

export default meta;

export const Primary: Story = {};
