import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const items = [1, 2, 3];
  const count = useSignal(0);
  const currItem = useSignal<string | null>(null);

  return (
    <>
      <Accordion.Root
        onChange$={(value: string) => {
          count.value++;
          currItem.value = value;
        }}
      >
        {items.map((item) => (
          <Accordion.Item value={`item-${item}`} class="collapsible" key={item}>
            <Accordion.Header>
              <Accordion.Trigger class="collapsible-trigger">
                <span>Trigger {item}</span>
                <LuChevronDown />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class="collapsible-content collapsible-content-outline">
              Inside Content {item}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      <div style={{ marginTop: '1rem' }}>
        <p>Called change count: {count.value}</p>
        <p>Changed to: {currItem.value ?? 'nothing'}</p>
      </div>
    </>
  );
});

// interal
import styles from '../snippets/accordion.css?inline';
