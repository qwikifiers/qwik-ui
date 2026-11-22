import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const location = useLocation();
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const user = useSignal(location.url.searchParams.get('value') ?? '');
  const submitted = useSignal<string>();

  const handleSubmit$ = $((_: SubmitEvent, form: HTMLFormElement) => {
    submitted.value = JSON.stringify(new FormData(form).getAll('user'));
  });

  return (
    <form preventdefault:submit onSubmit$={handleSubmit$}>
      <Select.Root name="user" bind:value={user} class="select">
        <Select.Label>Logged in users</Select.Label>
        <Select.HiddenNativeSelect />
        <Select.Trigger class="select-trigger">
          <Select.DisplayValue placeholder="Select an option" />
        </Select.Trigger>
        <Select.Popover class="select-popover">
          {users.map((name) => (
            <Select.Item key={name}>
              <Select.ItemLabel>{name}</Select.ItemLabel>
            </Select.Item>
          ))}
        </Select.Popover>
      </Select.Root>
      <button type="button" onClick$={() => (user.value = 'Abby')}>
        Set to Abby
      </button>
      <button type="submit">Submit</button>
      <p data-testid="submitted">{submitted.value}</p>
    </form>
  );
});

// internal
import styles from '../snippets/select.css?inline';
