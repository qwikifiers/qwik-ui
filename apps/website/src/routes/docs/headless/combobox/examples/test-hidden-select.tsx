import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Combobox } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

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
      <Combobox.Root name="user" bind:value={user} class="combobox-root">
        <Combobox.Label class="combobox-label">Logged in users</Combobox.Label>
        <Combobox.HiddenNativeSelect />
        <Combobox.Control class="combobox-control">
          <Combobox.Input class="combobox-input" />
          <Combobox.Trigger class="combobox-trigger">
            <LuChevronDown class="combobox-icon" />
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Popover class="combobox-popover" gutter={8}>
          {users.map((name) => (
            <Combobox.Item key={name} class="combobox-item">
              <Combobox.ItemLabel>{name}</Combobox.ItemLabel>
            </Combobox.Item>
          ))}
        </Combobox.Popover>
      </Combobox.Root>
      <button type="button" onClick$={() => (user.value = 'Abby')}>
        Set to Abby
      </button>
      <button type="submit">Submit</button>
      <p data-testid="submitted">{submitted.value}</p>
    </form>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
