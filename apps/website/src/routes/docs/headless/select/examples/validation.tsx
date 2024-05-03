import { component$, useStyles$, $ } from '@builder.io/qwik';
import { LuCheck } from '@qwikest/icons/lucide';
import { Select } from '@qwik-ui/headless';
import { useForm, required, InitialValues } from '@modular-forms/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

type Users = {
  firstName: string;
};

export const useSelectFormLoader = routeLoader$<InitialValues<Users>>(() => ({
  firstName: '',
}));

export default component$(() => {
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const [, { Form, Field }] = useForm<Users>({
    loader: useSelectFormLoader(),
  });

  useStyles$(styles);

  const handleSubmit$ = $(() => {
    console.log('submitted!');
  });

  return (
    <Form onSubmit$={handleSubmit$}>
      <Select.Root class="select" required>
        <Select.Label>Logged in users</Select.Label>
        <Select.Trigger class="select-trigger">
          <Select.DisplayText placeholder="Select an option" />
        </Select.Trigger>
        <Select.Popover class="select-popover">
          <Select.Listbox class="select-listbox">
            {users.map((user) => (
              <Select.Item class="select-item" key={user}>
                <Select.ItemLabel>{user}</Select.ItemLabel>
                <Select.ItemIndicator>
                  <LuCheck />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Listbox>
        </Select.Popover>
        <Field
          name="firstName"
          type="string"
          validate={[required<string>('Make sure to select an option')]}
        >
          {(field, props) => (
            <>
              <Select.HiddenSelect {...props} />
              {field.error && <div style={{ color: '#D2122E' }}>{field.error}</div>}
            </>
          )}
        </Field>
      </Select.Root>
      <button type="submit">Submit my form!</button>
    </Form>
  );
});

// internal
import styles from '../snippets/select.css?inline';
