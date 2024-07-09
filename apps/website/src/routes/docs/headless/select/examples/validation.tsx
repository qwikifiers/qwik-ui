import { component$, useStyles$, $ } from '@builder.io/qwik';
import { LuCheck } from '@qwikest/icons/lucide';
import { Select } from '@qwik-ui/headless';
import { useForm, required } from '@modular-forms/qwik';

type Users = {
  firstName: string;
};

export default component$(() => {
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const [, { Form, Field }] = useForm<Users>({
    loader: { value: { firstName: '' } },
  });

  useStyles$(styles);

  const handleSubmit$ = $(() => {
    console.log('submitted!');
  });

  return (
    <Form onSubmit$={handleSubmit$}>
      <Field
        name="firstName"
        type="string"
        validate={[required<string>('Make sure to select an option')]}
      >
        {(field, props) => {
          return (
            <Select.Root class="select" required>
              <Select.HiddenNativeSelect {...props} />
              <Select.Label>Logged in users</Select.Label>
              <Select.Trigger class="select-trigger">
                <Select.DisplayValue placeholder="Select an option" />
              </Select.Trigger>
              {field.error && (
                <Select.ErrorMessage style={{ color: '#D2122E' }}>
                  {field.error}
                </Select.ErrorMessage>
              )}
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
        }}
      </Field>
      <button type="submit">Submit my form!</button>
    </Form>
  );
});

// internal
import styles from '../snippets/select.css?inline';
