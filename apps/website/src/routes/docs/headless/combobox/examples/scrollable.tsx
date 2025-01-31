import { component$, useStyles$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const items = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

  return (
    <Combobox.Root class="combobox-root">
      <Combobox.Label class="combobox-label">User count</Combobox.Label>
      <Combobox.Control class="combobox-control">
        <Combobox.Input class="combobox-input" />
        <Combobox.Trigger class="combobox-trigger">
          <LuChevronDown class="combobox-icon" />
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Popover class="combobox-popover combobox-max-height" gutter={8}>
        {items.map((item) => (
          <Combobox.Item key={item}>
            <Combobox.ItemLabel>{item}</Combobox.ItemLabel>
          </Combobox.Item>
        ))}
      </Combobox.Popover>
    </Combobox.Root>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
