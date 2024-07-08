import { component$, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];

  const rootRef = useSignal<HTMLDivElement>();
  const labelRef = useSignal<HTMLDivElement>();
  const triggerRef = useSignal<HTMLButtonElement>();
  const displayValueRef = useSignal<HTMLDivElement>();
  const popoverRef = useSignal<HTMLDivElement>();

  useVisibleTask$(() => {
    console.log('rootRef');
    console.log(rootRef.value);
    console.log(labelRef.value);
    console.log(triggerRef.value);
    console.log(displayValueRef.value);
    console.log(popoverRef.value);
  });

  return (
    <Select.Root class="select" ref={rootRef}>
      <Select.Label>Logged in users</Select.Label>
      <Select.Trigger class="select-trigger">
        <Select.DisplayValue placeholder="Select an option" />
      </Select.Trigger>
      <Select.Popover class="select-popover">
        {users.map((user) => (
          <Select.Item class="select-item" key={user}>
            <Select.ItemLabel>{user}</Select.ItemLabel>
            <Select.ItemIndicator>
              <LuCheck />
            </Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select.Popover>
    </Select.Root>
  );
});

// internal
import styles from '../snippets/select.css?inline';
import { LuCheck } from '@qwikest/icons/lucide';
