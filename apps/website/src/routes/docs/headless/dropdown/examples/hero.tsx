import { component$, useStyles$ } from '@builder.io/qwik';
import { Dropdown, Label } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  return (
    <Dropdown.Root>
      <Dropdown.Trigger class="dropdown-trigger">Git Settings</Dropdown.Trigger>
      <Dropdown.Popover class="dropdown-popover" gutter={8}>
        <Label>My Label</Label>
      </Dropdown.Popover>
      <Dropdown.Item>Hey</Dropdown.Item>
    </Dropdown.Root>
  );
});

// internal
import styles from '../snippets/dropdown.css?inline';
