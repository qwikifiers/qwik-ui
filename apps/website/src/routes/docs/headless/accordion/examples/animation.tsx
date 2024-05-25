import { component$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  const items = [1, 2, 3];

  return (
    <Accordion.Root animated>
      {items.map((item) => (
        <Accordion.Item class="collapsible" key={item}>
          <Accordion.Header>
            <Accordion.Trigger class="collapsible-trigger">
              <span>Trigger {item}</span>
              <LuChevronDown class="collapsible-transition" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class="collapsible-animation collapsible-content">
            <p class="collapsible-content-outline">Inside Content {item}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
});
