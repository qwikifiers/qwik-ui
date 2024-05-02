import { component$, useStyles$, $, useSignal } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const displaySig = useSignal<string[]>([]);

  const handleSubmit$ = $(async (e: SubmitEvent) => {
    console.log('submitted!');
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  });

  return (
    <form preventdefault:submit method="post" onSubmit$={handleSubmit$}>
      <Select.Root
        name="tesdt"
        bind:display={displaySig}
        multiple
        required
        class="select"
      >
        <Select.Label>Logged in users</Select.Label>
        <Select.Trigger class="select-trigger">
          <Select.Value>{displaySig.value.join(', ')}</Select.Value>
        </Select.Trigger>
        <Select.Popover class="select-popover">
          <Select.Listbox class="select-listbox">
            {users.map((user, index) => (
              <Select.Item value={index.toString()} key={user}>
                <Select.ItemLabel>{user}</Select.ItemLabel>
              </Select.Item>
            ))}
          </Select.Listbox>
        </Select.Popover>
      </Select.Root>
      <button type="submit">Submit my form!</button>
    </form>
  );
});

// internal
import styles from '../snippets/select.css?inline';
