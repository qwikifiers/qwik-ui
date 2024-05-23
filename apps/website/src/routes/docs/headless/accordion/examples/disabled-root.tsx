import { component$, useStyles$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const items = [1, 2, 3, 4];

  return (
    <Accordion.Root disabled={true}>
      {items.map((item) => (
        <Accordion.Item class="collapsible" key={item}>
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
  );
});

// interal
import styles from '../snippets/accordion.css?inline';
import { LuChevronDown } from '@qwikest/icons/lucide';
