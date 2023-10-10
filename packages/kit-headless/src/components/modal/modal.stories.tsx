import { component$ } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Modal, ModalProps } from './modal';
import { ModalClose } from './modal-close';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';
import { ModalPopup } from './modal-popup';
import { ModalTrigger } from './modal-trigger';

/**
 * Using a component$ here to be able to use `useSignal`.
 * useSignal cannot be used directly inside a story's render-Function.
 */
const DialogStoryComponent = component$((props: ModalProps) => {
  return (
    <>
      <Modal {...props}>
        <ModalTrigger>
          <button>Open Dialog</button>
        </ModalTrigger>
        <ModalPopup>
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
            <ModalClose>
              <button>Close Dialog</button>
            </ModalClose>
          </ModalFooter>
        </ModalPopup>
      </Modal>
      <div style="background-color: red; width: 50vw; height: 150vh"></div>
    </>
  );
});

const meta: Meta<ModalProps> = {
  component: Modal,
  args: {
    'aria-describedby': 'modal-text',
    'aria-labelledby': 'modal-heading',
  },
  render: (props) => <DialogStoryComponent {...props} />,
};

type Story = StoryObj<ModalProps>;

export default meta;

export const Primary: Story = {};
