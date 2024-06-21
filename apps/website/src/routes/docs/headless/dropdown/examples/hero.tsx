import { component$, useStyles$ } from '@builder.io/qwik';

import { Dropdown } from '@qwik-ui/headless';
import { LuCheck } from '@qwikest/icons/lucide';
import styles from '../snippets/dropdown.css?inline';

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
    <Dropdown.Root data-testid="dropdown">
      <Dropdown.Trigger class="dropdown-trigger">Git Settings</Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Arrow class="dropdown-arrow" />
        <Dropdown.Content class="dropdown-content">
          <Dropdown.Group class="dropdown-group">
            <Dropdown.GroupLabel class="dropdown-group-label">
              Actions
            </Dropdown.GroupLabel>
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
          <Dropdown.RadioGroup class="dropdown-group" defaultValue="main">
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
        </Dropdown.Content>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
});
