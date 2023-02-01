import { Meta } from '@storybook/html';
import { Modal } from './modal';
import { ModalTrigger } from './modalTrigger';
import { ModalContent } from './modalContent';
import { ModalActions } from './modalActions';

export default {
  title: 'Actions / Modal',
} as Meta;

const Template = (args: any) => (
  <>
    <ModalTrigger id="my-modal">Open Modal</ModalTrigger>
    <Modal id="my-modal" {...args}>
      <ModalContent>
        <h3 class="font-bold text-lg">model header</h3>
        <p class="py-4">The content of the modal</p>
        <ModalActions>action</ModalActions>
      </ModalContent>
    </Modal>
  </>
);

export const Default = Template.bind({});
