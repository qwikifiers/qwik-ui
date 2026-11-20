import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal, Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal(false);

  return (
    <Modal.Root bind:show={isOpen}>
      <Modal.Trigger>Open modal</Modal.Trigger>
      <Modal.Panel>
        <Modal.Title>Pick a user</Modal.Title>
        <Select.Root class="select">
          <Select.Label>Logged in users</Select.Label>
          <Select.Trigger class="select-trigger">
            <Select.DisplayValue placeholder="Select an option" />
          </Select.Trigger>
          <Select.Popover class="select-popover">
            {['Tim', 'Ryan', 'Jim'].map((user) => (
              <Select.Item key={user}>
                <Select.ItemLabel>{user}</Select.ItemLabel>
              </Select.Item>
            ))}
          </Select.Popover>
        </Select.Root>
      </Modal.Panel>
    </Modal.Root>
  );
});

// internal
import styles from '../snippets/select.css?inline';
