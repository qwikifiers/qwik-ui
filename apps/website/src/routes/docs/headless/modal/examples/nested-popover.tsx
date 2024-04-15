import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import {
  Modal,
  Select,
  SelectPopover,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';
import styles from '../snippets/modal.css?inline';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal(false);

  return (
    <>
      <button class="modal-trigger" onClick$={() => (isOpen.value = true)}>
        Open Modal
      </button>
      <Modal class="modal" bind:show={isOpen}>
        Modal Content
        <Select class="select">
          <SelectTrigger class="select-trigger">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectPopover class="select-popover">
            <SelectListbox class="select-listbox">
              <SelectOption>Option 1</SelectOption>
              <SelectOption>Option 2</SelectOption>
            </SelectListbox>
          </SelectPopover>
        </Select>
      </Modal>
    </>
  );
});
