import { component$, useStyles$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);

  return (
    <Combobox.Root class="combobox-root">
      <Combobox.Label class="combobox-label">Personal Trainers</Combobox.Label>

      <Combobox.Control class="combobox-control">
        <Combobox.Input class="combobox-input" />
        <Combobox.Trigger class="combobox-trigger">
          <LuChevronDown class="combobox-icon" />
        </Combobox.Trigger>
      </Combobox.Control>

      <Combobox.Popover class="combobox-popover" gutter={8}>
        <Combobox.Item class="combobox-item">
          <Combobox.ItemLabel>Option 1</Combobox.ItemLabel>
        </Combobox.Item>

        <Combobox.Item class="combobox-item">
          <Combobox.ItemLabel>Option 2</Combobox.ItemLabel>
        </Combobox.Item>
      </Combobox.Popover>
    </Combobox.Root>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
