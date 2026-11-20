import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const location = useLocation();
  const initial = location.url.searchParams.get('value') ?? 'BROTHER';
  const delay = Number(location.url.searchParams.get('delay') ?? 0);
  const hasAnyone = location.url.searchParams.get('anyone') !== 'off';
  const relations = [
    ...(hasAnyone ? [{ value: '', label: 'Anyone' }] : []),
    { value: 'BROTHER', label: 'Brother' },
    { value: 'OTHER', label: 'Other' },
    { value: 'SISTER', label: 'Sister' },
  ];
  const relation = useSignal(initial);
  const changes = useSignal<string[]>([]);

  return (
    <>
      <Select.Root
        bind:value={relation}
        class="select"
        onChange$={async (value: string) => {
          changes.value = [...changes.value, value];
          if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
        }}
      >
        <Select.Label>Relation</Select.Label>
        <Select.Trigger class="select-trigger">
          <Select.DisplayValue placeholder="Select an option" />
        </Select.Trigger>
        <Select.Popover class="select-popover">
          {relations.map((relation) => (
            <Select.Item value={relation.value} key={relation.value}>
              <Select.ItemLabel>{relation.label}</Select.ItemLabel>
            </Select.Item>
          ))}
        </Select.Popover>
      </Select.Root>
      <p data-testid="value">bind:value: "{relation.value}"</p>
      <p data-testid="changes">onChange$: {JSON.stringify(changes.value)}</p>
      <button onClick$={() => (relation.value = 'SISTER')}>Set to Sister</button>
    </>
  );
});

// internal
import styles from '../snippets/select.css?inline';
