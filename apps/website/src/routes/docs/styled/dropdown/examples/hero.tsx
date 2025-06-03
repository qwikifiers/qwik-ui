import { component$ } from '@builder.io/qwik';
import { Dropdown } from '@qwik-ui/styled';
import {
  LuCloud,
  LuCreditCard,
  LuGithub,
  LuKeyboard,
  LuLifeBuoy,
  LuLogOut,
  LuPlus,
  LuSettings,
  LuUser,
  LuUserPlus,
  LuUsers,
} from '@qwikest/icons/lucide';

export default component$(() => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>Git Settings</Dropdown.Trigger>
      <Dropdown.Popover gutter={8}>
        <Dropdown.Group>
          <Dropdown.GroupLabel>My Account</Dropdown.GroupLabel>
          <Dropdown.Separator />
          {[
            { label: 'Profile', disabled: false, shortcut: '⇧⌘P', icon: <LuUser /> },
            { label: 'Billing', disabled: true, shortcut: '⌘B', icon: <LuCreditCard /> },
            { label: 'Settings', disabled: false, shortcut: '⌘S', icon: <LuSettings /> },
            {
              label: 'Keyboard shortcuts',
              disabled: false,
              shortcut: '⌘K',
              icon: <LuKeyboard />,
            },
          ].map((action) => (
            <Dropdown.Item key={action.label} disabled={action.disabled}>
              {action.icon}
              {action.label}
              <Dropdown.Shortcut>{action.shortcut}</Dropdown.Shortcut>
            </Dropdown.Item>
          ))}
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Group>
          {[
            { label: 'Team', disabled: false, shortcut: '⌘+T', icon: <LuUsers /> },
            {
              label: 'Invite users',
              disabled: false,
              shortcut: '⌘+I',
              icon: <LuUserPlus />,
            },
            { label: 'New Team', disabled: false, shortcut: '⌘+N', icon: <LuPlus /> },
          ].map((action) => (
            <Dropdown.Item key={action.label} disabled={action.disabled}>
              {action.icon}
              {action.label}
              <Dropdown.Shortcut>{action.shortcut}</Dropdown.Shortcut>
            </Dropdown.Item>
          ))}
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Group>
          {[
            { label: 'GitHub', disabled: false, shortcut: '⌘+G', icon: <LuGithub /> },
            { label: 'Support', disabled: false, shortcut: '⌘+S', icon: <LuLifeBuoy /> },
            { label: 'API', disabled: true, shortcut: '⌘+A', icon: <LuCloud /> },
          ].map((action) => (
            <Dropdown.Item key={action.label} disabled={action.disabled}>
              {action.icon}
              {action.label}
              <Dropdown.Shortcut>{action.shortcut}</Dropdown.Shortcut>
            </Dropdown.Item>
          ))}
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Item>
          <LuLogOut />
          <span>Log out</span>
          <Dropdown.Shortcut>⇧⌘Q</Dropdown.Shortcut>
        </Dropdown.Item>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
});
