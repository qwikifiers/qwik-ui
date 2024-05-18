import { component$, useStyles$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const items = [1, 2, 3];

  return (
    <Accordion.Root>
      {items.map((item) => (
        <Accordion.Item class="accordion-item" key={item}>
          <Accordion.Header>
            <Accordion.Trigger class="accordion-trigger">
              <span>Trigger {item}</span>
              <LuChevronDown />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class="accordion-content accordion-animation">
            Inside Content {item}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
});

// interal
import styles from '../snippets/accordion.css?inline';
