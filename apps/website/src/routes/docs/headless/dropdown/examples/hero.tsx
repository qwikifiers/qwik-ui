import { component$, useStyles$ } from '@qwik.dev/core';
import { Dropdown } from '@qwik-ui/headless';
import { LuCheck } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);

  const actions = [
    { label: 'Commit ⌘+K', disabled: false },
    { label: 'Push ⇧+⌘+K', disabled: false },
    { label: 'Update Project ⌘+T', disabled: true },
  ];

  const checkboxItems = ['Show Git Log', 'Show History'];

  const radioItems = ['main', 'develop'];

  return (
    <Dropdown.Root>
      <Dropdown.Trigger class="dropdown-trigger">Git Settings</Dropdown.Trigger>
      <Dropdown.Popover class="dropdown-popover" gutter={8}>
        <Dropdown.Group class="dropdown-group">
          <Dropdown.GroupLabel class="dropdown-group-label">Actions</Dropdown.GroupLabel>
          {actions.map((action) => (
            <Dropdown.Item
              key={action.label}
              class="dropdown-item"
              disabled={action.disabled}
            >
              {action.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Group>
        <Dropdown.Separator />
        {checkboxItems.map((item) => {
          return (
            <Dropdown.CheckboxItem key={item} class="dropdown-item">
              <Dropdown.ItemIndicator>
                <LuCheck />
              </Dropdown.ItemIndicator>
              {item}
            </Dropdown.CheckboxItem>
          );
        })}
        <Dropdown.Separator />
        <Dropdown.RadioGroup class="dropdown-group" value="main">
          {radioItems.map((item) => {
            return (
              <Dropdown.RadioItem key={item} class="dropdown-item" value={item}>
                <Dropdown.ItemIndicator>
                  <LuCheck />
                </Dropdown.ItemIndicator>
                {item}
              </Dropdown.RadioItem>
            );
          })}
        </Dropdown.RadioGroup>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
});

// internal
import styles from '../snippets/dropdown.css?inline';
