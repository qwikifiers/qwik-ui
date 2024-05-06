import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Collapsible } from '@qwik-ui/headless';
import styles from '../snippets/collapsible.css?inline';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal<boolean>(false);

  return (
    <>
      <input
        style={{ width: '20px', height: '20px', accentColor: 'hsl(var(--primary))' }}
        type="checkbox"
        bind:checked={isOpen}
      />

      <p>
        is open: <strong>{isOpen.value ? 'true' : 'false'}</strong>
      </p>

      <Collapsible.Root class="collapsible" bind:open={isOpen}>
        <Collapsible.Trigger class="collapsible-trigger">Trigger</Collapsible.Trigger>
        <Collapsible.Content class="collapsible-content">
          <p class="collapsible-content-outline">Content</p>
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  );
});
