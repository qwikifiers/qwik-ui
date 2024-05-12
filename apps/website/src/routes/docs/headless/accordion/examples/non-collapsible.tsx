import { component$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

// non-collapsible
export default component$(() => {
  const items = [1, 2, 3];

  return (
    <Accordion.Root collapsible={false}>
      {items.map((item) => (
        <Accordion.Item class="accordion-item" key={item}>
          <Accordion.Header>
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
