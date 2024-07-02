import { component$, useStyles$, $, useSignal } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';
import { LuCheck } from '@qwikest/icons/lucide';

type FormData = Record<string, FormDataEntryValue[]>;

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const displayValue = useSignal<string[]>([]);

  const submittedData = useSignal<FormData | null>(null);
  const formName = 'my-example-name!';

  const handleSubmit$ = $(async (_: SubmitEvent, form: HTMLFormElement) => {
    const formData = new FormData(form);

    // multi-select example. (Don't use getAll for single)
    const entries = formData.getAll(formName);
    submittedData.value = { [formName]: entries };
  });

  return (
    <>
      <form preventdefault:submit onSubmit$={handleSubmit$}>
        <Select.Root
          name={formName}
          bind:displayValue={displayValue}
          multiple
          required
          class="select"
        >
          <Select.Label>Logged in users</Select.Label>
          <Select.HiddenNativeSelect />
          <Select.Trigger class="select-trigger">
            <Select.DisplayValue>{displayValue.value.join(', ')}</Select.DisplayValue>
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
        <button type="submit">Submit my form!</button>
      </form>
      {submittedData.value && (
        <>
          <strong>You submitted:</strong>
          <code>{JSON.stringify(submittedData.value)}</code>
        </>
      )}
    </>
  );
});

// internal
import styles from '../snippets/select.css?inline';
