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
      <button
        style={{ marginTop: '1rem' }}
        onClick$={() => {
          // toggle the first item
          if (currOpenItem.value === 'item-1') {
            currOpenItem.value = null;
          } else {
            currOpenItem.value = 'item-1';
          }
        }}
      >
        Toggle first item
      </button>
    </>
  );
});

// interal
import styles from '../snippets/accordion.css?inline';
