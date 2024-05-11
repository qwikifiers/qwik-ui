import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal, Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal(false);

  return (
    <Modal.Root bind:show={isOpen}>
      <Modal.Trigger class="modal-trigger" onClick$={() => (isOpen.value = true)}>
        Open Modal
      </Modal.Trigger>
      <Modal.Panel class="modal">
        Modal Content
        <Select.Root class="select">
          <Select.Label>Logged in users</Select.Label>
          <Select.Trigger class="select-trigger">
            <Select.DisplayText placeholder="Select an option" />
          </Select.Trigger>
          <Select.Popover class="select-popover">
            <Select.Listbox class="select-listbox">
              <Select.Item>
                <Select.ItemLabel>Option 1</Select.ItemLabel>
              </Select.Item>
              <Select.Item>
                <Select.ItemLabel>Option 2</Select.ItemLabel>
              </Select.Item>
            </Select.Listbox>
          </Select.Popover>
        </Select.Root>
      </Modal.Panel>
    </Modal.Root>
  );
});

// internal
import styles from '../snippets/modal.css?inline';
