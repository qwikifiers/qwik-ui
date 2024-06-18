import { component$, useStyles$ } from '@builder.io/qwik';
import { Modal, Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  return (
    <Modal.Root>
      <Modal.Trigger class="modal-trigger">Open Modal</Modal.Trigger>
      <Modal.Panel class="modal-panel">
        Modal Content
        <Select.Root class="select">
          <Select.Label>Logged in users</Select.Label>
          <Select.Trigger class="select-trigger">
            <Select.DisplayValue placeholder="Select an option" />
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
