import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const nums = [1, 2, 3];
  const currOpenItem = useSignal<string | null>(null);

  return (
    <>
      <Accordion.Root bind:value={currOpenItem}>
        {nums.map((num) => (
          <Accordion.Item value={`item-${num}`} class="collapsible" key={num}>
            <Accordion.Header>
              <Accordion.Trigger class="collapsible-trigger">
                <span>Trigger {num}</span>
                <LuChevronDown />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class="collapsible-content collapsible-content-outline">
              Inside Content {num}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      <p style={{ marginTop: '1rem' }}>
        Current open item:{' '}
        {currOpenItem.value === null ? 'Not selected' : currOpenItem.value}
      </p>
    </>
  );
});

// interal
import styles from '../snippets/accordion.css?inline';
