import { component$, useStyles$, $, useSignal } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuCheck, LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const submittedData = useSignal<string>();

  const fruits = [
    'Apple',
    'Apricot',
    'Bilberry',
    'Blackberry',
    'Blackcurrant',
    'Currant',
    'Cherry',
    'Coconut',
  ];

  const formName = 'combobox-form-name';

  const handleSubmit$ = $((e: SubmitEvent) => {
    const formData = new FormData(e.target as HTMLFormElement);
    const selectedFruit = formData.get(formName) as string;
    submittedData.value = selectedFruit ?? undefined;
  });

  return (
    <form onSubmit$={handleSubmit$} preventdefault:submit>
      <Combobox.Root name={formName} class="combobox-root">
        <Combobox.Label class="combobox-label">Personal Trainers</Combobox.Label>
        <Combobox.HiddenNativeSelect />
        <Combobox.Control class="combobox-control">
          <Combobox.Input class="combobox-input" />
          <Combobox.Trigger class="combobox-trigger">
            <LuChevronDown class="combobox-icon" />
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Popover class="combobox-popover" gutter={8}>
          {fruits.map((fruit) => (
            <Combobox.Item key={fruit} class="combobox-item">
              <Combobox.ItemLabel>{fruit}</Combobox.ItemLabel>
              <Combobox.ItemIndicator>
                <LuCheck />
              </Combobox.ItemIndicator>
            </Combobox.Item>
          ))}
        </Combobox.Popover>
      </Combobox.Root>
      <button type="submit">Submit my form!</button>
      {submittedData.value && (
        <div>
          <strong>You submitted:</strong>
          <code>{JSON.stringify(submittedData.value)}</code>
        </div>
      )}
    </form>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
