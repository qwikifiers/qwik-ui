import { component$, useStyles$, useSignal } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const items = [1, 2, 3];
  const isRendered = useSignal(false);

  return (
    <>
      <button style={{ marginBottom: '1rem' }} onClick$={() => (isRendered.value = true)}>
        Render Accordion
      </button>
      {isRendered.value && (
        <Accordion.Root>
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
      )}
    </>
  );
});

// interal
import styles from '../snippets/accordion.css?inline';
