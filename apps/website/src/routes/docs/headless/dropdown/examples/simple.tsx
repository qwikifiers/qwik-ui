import { component$ } from '@builder.io/qwik';
import { Dropdown } from '@qwik-ui/headless';

export default component$(() => {
  const actions = [
    { label: 'Merge Branch ⌘+M', disabled: false },
    { label: 'Rebase Branch ⌘+R', disabled: true },
    { label: 'Stash Changes ⌘+S', disabled: false },
    { label: 'Checkout Branch ⌘+B', disabled: false },
    { label: 'Pull Changes ⌘+P', disabled: false },
    { label: 'Create Tag ⌘+T', disabled: false },
  ];

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>Git Settings</Dropdown.Trigger>
      <Dropdown.Popover gutter={8}>
        {actions.map((action) => (
          <Dropdown.Item key={action.label} disabled={action.disabled}>
            {action.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Popover>
    </Dropdown.Root>
  );
});
