import { component$ } from '@qwik.dev/core';
import { Accordion } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  const items = [1, 2, 3];

  return (
    <Accordion.Root>
      {items.map((item) => (
        <Accordion.Item class="accordion-item" key={item}>
          <Accordion.Header as="h4">
            <Accordion.Trigger class="accordion-trigger">
              <span>Trigger {item}</span>
              <LuChevronDown />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class="accordion-content">
            Inside Content {item}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
});
