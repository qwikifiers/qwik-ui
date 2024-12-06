import { component$, useStyles$, $ } from '@builder.io/qwik';
import { LuCheck, LuChevronDown } from '@qwikest/icons/lucide';
import { Combobox } from '@qwik-ui/headless';
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
            <Combobox.Root class="combobox-root">
              <Combobox.Label class="combobox-label">Logged in users</Combobox.Label>
              <Combobox.HiddenNativeSelect {...props} />
              <Combobox.Control class="combobox-control">
                <Combobox.Input class="combobox-input" />
                <Combobox.Trigger class="combobox-trigger">
                  <LuChevronDown class="combobox-icon" />
                </Combobox.Trigger>
              </Combobox.Control>
              {field.error && (
                <Combobox.ErrorMessage style={{ color: '#D2122E' }}>
                  {field.error}
                </Combobox.ErrorMessage>
              )}
              <Combobox.Popover class="combobox-popover" gutter={8}>
                {users.map((user) => (
                  <Combobox.Item key={user} class="combobox-item">
                    <Combobox.ItemLabel>{user}</Combobox.ItemLabel>
                    <Combobox.ItemIndicator>
                      <LuCheck />
                    </Combobox.ItemIndicator>
                  </Combobox.Item>
                ))}
              </Combobox.Popover>
            </Combobox.Root>
          );
        }}
      </Field>
      <button type="submit">Submit my form!</button>
    </Form>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
