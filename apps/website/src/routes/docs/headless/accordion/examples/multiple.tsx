import { component$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  const items = [1, 2, 3];

  return (
    <Accordion.Root multiple>
      {items.map((item) => (
        <Accordion.Item class="collapsible" key={item}>
          <Accordion.Header>
            <Accordion.Trigger class="collapsible-trigger">
              <span>Trigger {item}</span>
              <LuChevronDown />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class="collapsible-content-outline collapsible-content">
            Inside Content {item}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
});
